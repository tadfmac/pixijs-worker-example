import * as PIXI from "./webworker-v8.6.2.mjs";

self.imageURL = "face.png";
self.basePath = "http://localhost:3000/";
self.pixi = {spr:null};

self.initApp = async (offscreen)=>{
  PIXI.DOMAdapter.set(PIXI.WebWorkerAdapter);
  self.pixi.app = new PIXI.Application();
  await self.pixi.app.init({canvas:offscreen, width:1000,height:800});
  self.pixi.container = new PIXI.Container();
  await PIXI.Assets.init({basePath:self.basePath});
  self.pixi.tex = await PIXI.Assets.load(self.imageURL);
  self.pixi.spr = new PIXI.Sprite(self.pixi.tex);
  self.pixi.spr.anchor.set(0.5);
  self.pixi.spr.x = 100;
  self.pixi.spr.y = 100;
  self.pixi.container.addChild(self.pixi.spr);
  self.pixi.app.stage.addChild(self.pixi.container);
  self.pixi.ticker = PIXI.Ticker.shared;
  self.pixi.ticker.add((delta) => {
    update();
  });
}

self.update = () =>{
  if(pixi.spr != null){
    self.pixi.spr.rotation -= 0.01;
  }
};

self.addEventListener("message", async (e) => {
  await self.initApp(e.data);
});
