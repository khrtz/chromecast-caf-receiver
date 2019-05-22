const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();
// playerManager.removeSupportedMediaCommands(cast.framework.messages.Command.SEEK, true);
// const currentShow = new cast.framework.messages.TvShowMediaMetadata();

function makeRequest (method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

playerManager.setMessageInterceptor(
    cast.framework.messages.MessageType.LOAD,
    request => {
      // castDebugLogger.info('MyAPP.LOG', 'Intercepting LOAD request');
      
      // request.media.streamType = cast.framework.messages.StreamType.LIVE;


      if (request.media && request.media.entity) {
        request.media.contentId = request.media.entity;
      }

      // cast.framework.messages.MessageType.SET_CREDENTIALS;

      return new Promise((resolve, reject) => {

        if(request.media.contentType == 'video/mp4') {
          return resolve(request);
        }

        // Fetch content repository by requested contentId
        makeRequest('GET', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4')
          .then(function (data) {
	          var item = data[request.media.contentId];
	          if(!item) {
	            // Content could not be found in repository
              castDebugLogger.error('MyAPP.LOG', 'Content not found');
	            reject();
	          } else {
	            // Adjusting request to make requested content playable
	            request.media.contentId = item.stream.hls;
	            request.media.contentType = 'application/x-mpegurl';
              castDebugLogger.warn('MyAPP.LOG', 'Playable URL: ' + request.media.contentId);

	            // Add metadata
	            var metadata = new cast.framework.messages.MovieMediaMetadata();
	            metadata.metadataType = cast.framework.messages.MetadataType.GENERIC;
	            metadata.title = item.title;
	            metadata.subtitle = item.author;

              request.media.metadata = metadata;
	            resolve(request);
	          }
        });
      });
    });

/** Debug Logger **/
const castDebugLogger = cast.debug.CastDebugLogger.getInstance();

// Enable debug logger and show a warning on receiver
// NOTE: make sure it is disabled on production
castDebugLogger.setEnabled(true);
castDebugLogger.showDebugLogs(true);
  
castDebugLogger.info('DEV.LOG', 'current show', new cast.framework.messages.TvShowMediaMetadata());
castDebugLogger.info('DEV.LOG', 'uiConfig', new cast.framework.ui.UiConfig());

playerManager.addEventListener(
  cast.framework.events.category.CORE,
  event => {
      // castDebugLogger.info('EVENT.CORE', event);
});

// Set verbosity level for custom tags
castDebugLogger.loggerLevelByTags = {
    'EVENT.CORE': cast.framework.LoggerLevel.DEBUG,
    'MyAPP.LOG': cast.framework.LoggerLevel.WARNING,
    "DEV.LOG": cast.framework.LoggerLevel.INFO
};

/** Optimizing for smart displays **/
const playerData = new cast.framework.ui.PlayerData();
const playerDataBinder = new cast.framework.ui.PlayerDataBinder(playerData);
const touchControls = cast.framework.ui.Controls.getInstance();

let browseItems = getBrwoseItems();

function getBrwoseItems() {
  let browseItems = [];
  makeRequest('GET', 'https://tse-summit.firebaseio.com/content.json')
  .then(function (data) {
    for (let key in data) {
      let item = new cast.framework.ui.BrowseItem();
      item.entity = key;
      item.title = data[key].title;
      item.subtitle = data[key].description;
      item.image = new cast.framework.messages.Image(data[key].poster);
      item.imageType = cast.framework.ui.BrowseImageType.MOVIE;
      browseItems.push(item);
    }
  });
  return browseItems;
}

let browseContent = new cast.framework.ui.BrowseContent();
browseContent.title = 'Up Next';
browseContent.items = browseItems;
browseContent.targetAspectRatio =
  cast.framework.ui.BrowseImageAspectRatio.LANDSCAPE_16_TO_9;

playerDataBinder.addEventListener(
  cast.framework.ui.PlayerDataEventType.MEDIA_CHANGED,
  (e) => {
    if (!e.value) return;

    // Clear default buttons and re-assign
    touchControls.clearDefaultSlotAssignments();
    touchControls.assignButton(
      cast.framework.ui.ControlsSlot.SLOT_1,
      cast.framework.ui.ControlsButton.SEEK_BACKWARD_30
    );

    // Media browse
    touchControls.setBrowseContent(browseContent);
    // castDebugLogger.info('DEV.LOG', 'browse items', browseItems[0].imageType);
  });

const playbackConfig = new cast.framework.PlaybackConfig();

// Sets the player to start playback as soon as there are five seconds of
// media contents buffered. Default is 10.
playbackConfig.autoResumeDuration = 5;

playerManager.addSupportedMediaCommands(cast.framework.messages.Command.PAUSE);
playerManager.addSupportedMediaCommands(cast.framework.messages.Command.LIKE);

context.start({
  touchScreenOptimizedApp: true,
  playbackConfig: playbackConfig,
  supportedCommands: cast.framework.messages.Command.ALL_BASIC_MEDIA |
                     cast.framework.messages.Command.QUEUE_PREV |
                     cast.framework.messages.Command.QUEUE_NEXT
});
