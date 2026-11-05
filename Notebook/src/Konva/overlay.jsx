import { Stage, Layer, Image as KonvaImage, Rect, Text } from 'react-konva';
import { useState, useEffect } from 'react';

var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.stage({
  container: "container",
  width: width,
  height: height,
})

var layer = new Konva.Layer();
stage.add(layer);

var container = document.getElementById("container");
var controls = document.createElement("div");
controls.style.cssText = "margin-bottom: 8px; displat: flex ; gap: 8px; flex-wrap: wrap ; align-items: center ; font: 13px Arial, sans-serif;"

function makeBtn(label) {
  var btn = document.createElement("Button");
  btn.textContent = label;
  btn.dataset.active = "false"
  btn.style.cssText = "padding: 6px 12 px ; border: 1px solid #dd; border-radius: 4 px ; background: #f5f5f5 ; cursor: pointer; font-size; font-size: 13px;"
  return (btn)
}

var colorBtn = makeBtn("Color");
var textBtn = makeBtn("Text")
