'use strict'

var swfobject = require('swfobject')

function bind (func, context) {
  return function () {
    func.apply(context, arguments)
  }
}

function b64toBlob (b64Data, contentType, sliceSize) {
  contentType = contentType || ''
  sliceSize = sliceSize || 512

  var byteCharacters = atob(b64Data.replace(/(\r\n|\n|\r)/gm, ''))
  var byteArrays = []

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize)

    var byteNumbers = new Array(slice.length)
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    var byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  var blob = new Blob(byteArrays, { type: contentType })
  return blob
}

var RecorderFlash = function (options) {
  this.initialize(options)
}

RecorderFlash.prototype.initialize = function (cfg) {
  window['flashRecorder'] = this
  this._events = []
  this._initialized = false
  this.swfSrc = 'recorder.swf'
  if (cfg.swfSrc) {
    this.swfSrc = cfg.swfSrc
  }

  this._setupFlashContainer()
  this._loadFlash()
  this.bind('initialized', this._onInitialized)
  this.bind('mp3Data', this._onDataReady)
  this.bind('ended', this._onEnded)
  this.bind('microphoneMuted', this._showFlash)
  this.bind('record', this._started)
}

RecorderFlash.prototype._setupFlashContainer = function () {
  this.flashContainer = document.createElement('div')
  this.flashContainer.setAttribute('id', 'recorderFlashContainer')
  this.flashContainer.setAttribute('style', 'position: fixed; left: -9999px; top: -9999px; width: 230px; height: 140px; margin-left: 10px; border-top: 6px solid rgba(128, 128, 128, 0.6); border-bottom: 6px solid rgba(128, 128, 128, 0.6); border-radius: 5px 5px; padding-bottom: 1px; padding-right: 1px;')
  document.body.appendChild(this.flashContainer)
}

RecorderFlash.prototype._checkForFlashBlock = function () {
  window.setTimeout(bind(function () {
    if (!this._initialized) {
      this._flashBlockCatched = true
      this._showFlash()
    }
  }, this), 500)
}
RecorderFlash.prototype._started = function () {
  this._hideFlash()
  console.log(12222)
}

RecorderFlash.prototype._onInitialized = function (e) {
  this._initialized = true
  if (this._flashBlockCatched) {
    this._hideFlash()
  }
}

RecorderFlash.prototype._onDataReady = function (e) {
  this._callbackDataReady(e)
}

RecorderFlash.prototype._showFlashRequiredDialog = function () {
  this.flashContainer.innerHTML = "<p>Adobe Flash Player 10.1 or newer is required to use this feature.</p><p><a href='http://get.adobe.com/flashplayer' target='_top'>Get it on Adobe.com.</a></p>"
  this.flashContainer.style.color = 'white'
  this.flashContainer.style.backgroundColor = '#777'
  this.flashContainer.style.textAlign = 'center'
  this._showFlash()
}

RecorderFlash.prototype._loadFlash = function () {
  var flashElement = document.createElement('div')
  flashElement.setAttribute('id', 'recorderFlashObject')
  this.flashContainer.appendChild(flashElement)
  var fv = { recorderInstance: 'window.flashRecorder' }
  swfobject.embedSWF(this.swfSrc, 'recorderFlashObject', '231', '141', '10.1.0', undefined, fv, { allowscriptaccess: 'always' }, undefined, bind(this._flashLoaded, this))
}

RecorderFlash.prototype._flashLoaded = function (e) {
  if (e.success) {
    this.swfObject = e.ref
    this._checkForFlashBlock()
  } else {
    this._showFlashRequiredDialog()
  }
}

RecorderFlash.prototype._showFlash = function () {
  this.flashContainer.style.left = ((window.innerWidth || document.body.offsetWidth) / 2) - 115 + 'px'
  this.flashContainer.style.top = ((window.innerHeight || document.body.offsetHeight) / 2) - 70 + 'px'
}

RecorderFlash.prototype._hideFlash = function () {
  this.flashContainer.style.left = '-9999px'
  this.flashContainer.style.top = '-9999px'
}

RecorderFlash.prototype.record = function () {
  this.flashInterface().recordStart()
}

RecorderFlash.prototype.play = function () {
  this.flashInterface().playback()
}

RecorderFlash.prototype.stop = function () {
  return this.flashInterface().recordStop()
}

RecorderFlash.prototype.pause = function () {
  return this.flashInterface().record()
}

RecorderFlash.prototype.getData = function (callback) {
  if (callback) {
    this._callbackDataReady = function (data) {
      callback.call(this, b64toBlob(data, 'audio/mp3'))
    }
  }
  this.flashInterface().mp3Data()
}

RecorderFlash.prototype.getBase64Data = function () {
  return this.flashInterface().wavData()
}

RecorderFlash.prototype.flashInterface = function () {
  if (!this.swfObject) {
    return null
  } else if (this.swfObject.recordStart) {
    return this.swfObject
  } else if (this.swfObject.children[3].recordStart) {
    return this.swfObject.children[3]
  }
}

RecorderFlash.prototype.bind = function (eventName, fn) {
  if (!this._events[eventName]) { this._events[eventName] = [] }
  this._events[eventName].push(fn)
}

RecorderFlash.prototype.triggerEvent = function (eventName, arg0, arg1) {
  if (!this._events[eventName]) {
    return
  }
  for (var i = 0, len = this._events[eventName].length; i < len; i++) {
    if (this._events[eventName][i]) {
      this._events[eventName][i].apply(this, [arg0, arg1])
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = new RecorderFlash({ swfSrc: '/static/recorder.swf' })
}
