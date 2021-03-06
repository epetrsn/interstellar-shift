var Game = {
    queue: null,
    stage: null,
    displayObjects: {
        activeState: null,
        aboveActiveState: null,
        screenColorCover: null
    },
    runtime: 0,
    dx: {w: 495, h: 600},
    sound: {
        currentlyPlayingSong: undefined,
        songVolume: 0.5,
        sfxVolume: 0.5,
        songMuted: false,
        sfxMuted: false,
        playSFX: function (sfx, indvSFXVolume) {
            if (typeof volume === "undefined") {
                volume = 1;
            }
            var out;
            if (Game.sound.sfxMuted === false) {
                out = createjs.Sound.play(sfx, {volume: indvSFXVolume * Game.sound.sfxVolume});
            }
            return out;
        },
        playSong: function (Song, FadeIn) {
            if (Game.sound.currentlyPlayingSong) {
                if (FadeIn) {
                    createjs.Tween.get(Game.sound.currentlyPlayingSong).to({volume: 0}, 500).call(function (song) {
                        song.stop();
                    }, [Game.sound.currentlyPlayingSong]);
                } else {
                    Game.sound.currentlyPlayingSong.stop();
                }
            }

            Game.sound.currentlyPlayingSong = createjs.Sound.play(Song, {loop: -1});

            if (FadeIn) {
                Game.sound.currentlyPlayingSong.volume = 0;
                createjs.Tween.get(Game.sound.currentlyPlayingSong).to({volume: Game.sound.songVolume}, 500);
            } else {
                Game.sound.currentlyPlayingSong.volume = Game.sound.songVolume;
            }
        },
        muteSong: function () {
            if (Game.sound.currentlyPlayingSong) {
                if (Game.sound.songMuted === true) {
                    Game.sound.songMuted = false;
                    Game.sound.currentlyPlayingSong.volume = Game.sound.songVolume;
                } else {
                    Game.sound.songMuted = true;
                    Game.sound.currentlyPlayingSong.volume = 0;
                }
            }
        },
        muteSFX: function () {
            Game.sound.sfxMuted = !Game.sound.sfxMuted;
        }
    },
    setBackgroundColor: function (color) {
        "use strict";
        this.stage.canvas.parentElement.style.background = color;
    },
    preloadAssets: function () {
        "use strict";
        console.log("Preload Game Assets");
        
        function handleComplete() {
            Game.start();
        }
        
        var manifest = [
            {id: "gp_red", src: "graphics/GamePieces_Red.png"},
            {id: "gp_blue", src: "graphics/GamePieces_Blue.png"},
            {id: "gp_green", src: "graphics/GamePieces_Green.png"},
            {id: "gp_purple", src: "graphics/GamePieces_Purple.png"},
            {id: "gp_yellow", src: "graphics/GamePieces_Yellow.png"},
            {id: "gp_glow", src: "graphics/GamePieces__Glow.png"},
            {id: "gp_glowCover", src: "graphics/glowPieceCover.png"},
            {id: "gp_outline", src: "graphics/GamePieces_Outline.png"},
            {id: "gameSong", src: "sound/gameMusic_96kbps.mp3"},
            {id: "changeMode", src: "sound/changeMode.mp3"},
        ];
        
        if (manifest.length > 0) {
            Game.queue = new createjs.LoadQueue();

            Game.queue.installPlugin(createjs.Sound);
            Game.queue.on("complete", handleComplete, this);
            Game.queue.loadManifest(manifest);
        } else {
            handleComplete();
        }
    },
    setupProgram: function () {
        "use strict";
        
        createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashPlugin]);
        createjs.Sound.alternateExtensions = ["mp3"];
        
        Game.stage = new createjs.Stage("gameCanvas");
        
        createjs.Ticker.setFPS(20);
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        createjs.Touch.enable(Game.stage, true, false);
        
        Game.stage.enableMouseOver(20);
        
        Game.preloadAssets();
    },
    switchActiveState: function (NewState) {
        if (Game.displayObjects.activeState) {
            Game.stage.removeChild(Game.displayObjects.activeState);
        }
        Game.displayObjects.activeState = NewState;
        Game.stage.addChild(NewState);
        
        //Make sure Game.displayObjects.aboveActiveState ends up on top of everything else.
        Game.stage.removeChild(Game.displayObjects.aboveActiveState);
        Game.stage.addChild(Game.displayObjects.aboveActiveState);
        
    },
    start: function () {
        "use strict";

        //Setup gamepiece image data
        gdc.gamePieceData.setupGamePieceImages()
        
        //Setup some top level display objects
        Game.displayObjects.aboveActiveState = new createjs.Container();
        Game.stage.addChild(Game.displayObjects.aboveActiveState);
        
        Game.displayObjects.screenColorCover = new createjs.Shape();
        Game.displayObjects.aboveActiveState.addChild(Game.displayObjects.screenColorCover);
        
        //Setup the first active state
        var ts = new gdc.titlescreen();
        Game.switchActiveState(ts);

        console.log("Start Game");
        
        createjs.Ticker.on("tick", Game.tick);
    },
    tick: function (event) {
        "use strict";
        Game.runtime += event.delta;
        Game.stage.update();
    },
    testHexagon: undefined
};
