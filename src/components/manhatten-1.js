import * as d3 from 'd3'

// console.log = function (){}  // uncomment to disable all console printing

/**
 * var Tile - A rectangle as the building block of layout operations.
 *
 * @param  {Number} x position of the rectangle relative to the container
 * @param  {Number} y position of the rectangle relative to the container
 * @param  {Number} w width of the rectangle
 * @param  {Number} h height of the rectangle
 * @return {Tile}   the rectangle (the tile)
 */
var Tile = function(x, y, w, h) {
  this.layout = {
    //layout getters
    get rect() {
      return { w: rect.w, h: rect.h, x: rect.x, y: rect.y }
    },
    get tile() {
      return {
        left: rect.x,
        right: rect.x + rect.w,
        top: rect.y,
        bottom: rect.y + rect.h
      }
    },
    get size() {
      return { width: rect.w, height: rect.h }
    },
    get origin() {
      return { origin: { x: rect.x, y: rect.y } }
    },
    get center() {
      return { x: rect.w / 2 + rect.x, y: rect.h / 2 + rect.y }
    },
    get width() {
      return rect.w
    },
    get height() {
      return rect.h
    },
    get x() {
      return rect.x
    },
    get y() {
      return rect.y
    },
    //layout setters
    set rect(t) {
      rect = {
        w: Math.round(t.width),
        h: Math.round(t.height),
        x: Math.round(t.x),
        y: Math.round(t.y)
      }
    },
    set size(s) {
      rect.w = Math.round(s.width)
      rect.h = Math.round(s.height)
    },
    set origin(or) {
      rect.x = Math.round(or.x)
      rect.y = Math.round(or.y)
    },
    set center(c) {
      rect.x = Math.round(c.x - rect.w / 2)
      rect.y = Math.round(c.y - rect.h / 2)
    },
    set width(w) {
      rect.w = Math.round(w)
    },
    set height(h) {
      rect.h = Math.round(h)
    },
    set x(x) {
      rect.x = Math.round(x)
    },
    set y(y) {
      rect.y = Math.round(y)
    }
  }

  this.getHandleRect = function() {
    if (!this.handle) return null
    var tile = {
      top: 0,
      left: 0,
      right: this.layout.tile.right - this.layout.tile.left,
      bottom: this.layout.tile.bottom - this.layout.tile.top
    }
    var center = {
      x: (tile.right - tile.left) / 2,
      y: (tile.bottom - tile.top) / 2
    }
    var r = 10,
      d = 5

    switch (this.handle) {
      case 'n':
        return {
          top: tile.top + d,
          bottom: tile.top + r + d,
          left: center.x - r / 2,
          right: center.x + r / 2
        }
      case 's':
        return {
          top: tile.bottom - r - d,
          bottom: tile.bottom - d,
          left: center.x - r / 2,
          right: center.x + r / 2
        }
      case 'w':
        return {
          top: center.y - r / 2,
          bottom: center.y + r / 2,
          left: tile.left + d,
          right: tile.left + r + d
        }
      case 'e':
        return {
          top: center.y - r / 2,
          bottom: center.y + r / 2,
          left: tile.right - r - d,
          right: tile.right - d
        }
      case 'nw':
        return {
          top: tile.top + d,
          bottom: tile.top + r + d,
          left: tile.left + d,
          right: tile.left + r + d
        }
      case 'ne':
        return {
          top: tile.top + d,
          bottom: tile.top + r + d,
          left: tile.right - r - d,
          right: tile.right - d
        }
      case 'sw':
        return {
          top: tile.bottom - r - d,
          bottom: tile.bottom - d,
          left: tile.left + d,
          right: tile.left + r + d
        }
      case 'se':
        return {
          top: tile.bottom - r - d,
          bottom: tile.bottom - d,
          left: tile.right - r - d,
          right: tile.right - d
        }
      default:
        return {
          top: center.y - r / 2,
          bottom: center.y + r / 2,
          left: center.x - r / 2,
          right: center.x + r / 2
        }
    }
  }

  this.repositionTo = function(totile) {
    rect.w = totile.width
    rect.h = totile.height
    rect.x = totile.x
    rect.y = totile.y
  }

// TODO: implement save restore of different layouts
  // this.pushLayout = function() {
  //   layouts.push(rect)
  // }
	//
  // this.popLayout = function() {
  //   rect = layouts.pop()
  // }

  this.getFrom = function(name) {
    return stored[name]
  }

  this.hasLayout = function(name, t) {
    return t ? t.hasLayout(name) : this.getFrom(name) != undefined
  }

  this.roundLayout = function() {
    rect = {
      w: Math.round(rect.w),
      h: Math.round(rect.h),
      x: Math.round(rect.x),
      y: Math.round(rect.y)
    }
  }

  this.saveLayout = function(name, t) {
    // if t, store t's current layout as named layout, else store own layout as named layout
    if (t)
      stored[name] = {
        w: t.layout.width,
        h: t.layout.height,
        x: t.layout.x,
        y: t.layout.y
      }
    else stored[name] = { w: rect.w, h: rect.h, x: rect.x, y: rect.y }
  }

  this.isInside = function(xy, callback, passthrough) {
    // cfac is a factor that determines the percentage of width and height that make up the center
    // intervals: [0,(1-x)/2], [(1+x)/2, 1] (x is short for cfac)
    // -- need to put that somewhere else?
    var cfac = 0.9
    var hwidth = 10,
      hheight = 10
    var outer =
      xy[0] > -hwidth &&
      xy[0] < rect.w + hwidth &&
      xy[1] > -hheight &&
      xy[1] < rect.h + hheight
    var center =
      xy[0] > rect.w * (1 - cfac) / 2 &&
      xy[0] < (1 + cfac) * rect.w / 2 &&
      xy[1] > rect.h * (1 - cfac) &&
      xy[1] < (1 + cfac) * rect.h / 2
    var inner = xy[0] > 0 && xy[0] < rect.w && xy[1] > 0 && xy[1] < rect.h

    var w = outer && xy[0] > -hwidth && xy[0] < hwidth
    var e = outer && xy[0] > rect.w - hwidth && xy[0] < rect.w + hwidth
    var n = outer && xy[1] > -hheight && xy[1] < hheight
    var s = outer && xy[1] > rect.h - hheight && xy[1] < rect.h + hheight
    var c = center

    var m = rect.h / rect.w
    var l =
      inner && !(c || w) && xy[1] > m * xy[0] && xy[1] < -m * xy[0] + rect.h
    // console.log('l', xy[1], '>', m * xy[0], '&&', xy[1], '<', -m * xy[0] + rect.h)
    var r =
      inner && !(c || e) && xy[1] < m * xy[0] && xy[1] > -m * xy[0] + rect.h
    var t =
      inner && !(c || n) && xy[1] < m * xy[0] && xy[1] < -m * xy[0] + rect.h
    var b =
      inner && !(c || s) && xy[1] > m * xy[0] && xy[1] > -m * xy[0] + rect.h

    // console.log(xy, 'inner', inner, m, l, r, t, b, center)

    if (typeof callback === 'function') {
      if (n && w) callback('nw', passthrough)
      if (n && e) callback('ne', passthrough)
      if (s && w) callback('sw', passthrough)
      if (s && e) callback('se', passthrough)

      if (n && !w && !e) callback('n', passthrough)
      if (s && !w && !e) callback('s', passthrough)
      if (w && !s && !n) callback('w', passthrough)
      if (e && !s && !n) callback('e', passthrough)
      if (c && !n && !s && !e && !w) callback('c', passthrough)
      if (l) callback('l', passthrough)
      if (r) callback('r', passthrough)
      if (t) callback('t', passthrough)
      if (b) callback('b', passthrough)
    }
    return c
  }

  this.restoreFrom = function(name, t) {
    var r
    if (t) {
      r = t.getFrom(name)
    } else {
      r = stored[name]
    }
    var changed =
      rect.w != r.w || rect.h != r.h || rect.x != r.x || rect.y != r.y
    if (changed) rect = { w: r.w, h: r.h, x: r.x, y: r.y }
    if (!rect) throw new Error('Stored layout not found: ' + name)
    return changed
  }

  var rect = {},
    stack = [],
    stored = {},
    hrect = {}
  if (!h) h = 100
  if (!w) w = 100
  if (!y) y = 0
  if (!x) x = 0

  var hrect = { h: 10, w: 10, x: 3, y: 3 }

  if (typeof x === 'object') rect = x
  else rect = { x: x, y: y, w: w, h: h }

  this.saveLayout('source_lyo')
  console.log('Tile:', this)

  return this
}

var waitForCompletion = false // needed for waiting an animation to complete (e.g. while swapping tiles animated)

//behavemodes:
var B_NONE = 0,
  B_RESIZING = 1,
  B_DRAGGING = 2
var behavemode = B_NONE // gobal behaviour mode: null, resizing, dragging. Set in dragstart, unchanged through drag, reset on dragend

var log = false


/**
 * Layout - Function to create a Layout object
 *
 * @param  {Array} data An array of objects to manage. Each object will have callbacks (as delegate functions) that will be called for diffent tasks
 * @param  {Object} canvas  The canvas (not the elemen type 'canvas'), where the Layout is held. Usually a sized div in the dom.
 * @param  {offset} offset x, y position (as object), where the Layout is drawn. Defaults to rectangle position of the canvas.
 * @return {Layout}  the Layout object
 *
 * delegate types: 'initial', 'select', 'draw'
 */
export var Layout = function(data /*: Array<Object> */, canvas /*: Object */, offset /*: Object */) {
  Layout.delegates = {}
  Layout.tiles = data
	Layout.margins = { top: 0, bottom: 0, left: 0, right: 0 }
	Layout.style = 'source'
	Layout.canvas = d3.select(canvas)

	let rect = Layout.canvas.node().getBoundingClientRect()
	console.log('Layout rect', rect)
  if (offset) Layout.offset = offset
  else Layout.offset = { x: rect.x, y: rect.y }

  Layout.canvas.size = { width: rect.width, height: rect.height }

  Layout.canvas.on('mousemove', Layout.prototype.mouseMove)
  Layout.canvas.on('touchmove', Layout.prototype.mouseMove)

  Layout.drag = d3
    .drag()
    .subject(function(d) { return [d.layout.x, d.layout.y]})
    .on('start', function(d, i) {
      var tiles = d3.selectAll('.tile').each(function(d) {
        d.layout.saveLayout('original')
      })

      console.log(
        'resizing start',
        d.content.id,
        d.layout.handle,
        d.layout.layout.rect
      )
      collectResizables()

      var res = d3.selectAll('.resize')
      if (!res.empty()) {
        behavemode = B_RESIZING
        //			Layout.canvas.on("mousemove", null)
        res.each(function(d) {
          console.log(
            'resizing',
            d.content.id,
            d.layout.handle,
            d.layout.layout.rect
          )
        })
      } else {
        behavemode = B_DRAGGING
        tiles.sort(function(a, b) {
          return a == d ? 1 : b == d ? -1 : 0
        })

        d3.select(this).classed('dragging', true)

        Layout.canvas.style('cursor', 'grab')

        d.layout.saveLayout('dragsource')
        d.layout.saveLayout('droptarget')

        console.log('drag started', d.layout.layout.rect)
      }
    // })
    d3.event.on('drag', function(d) {
      var res = d3.selectAll('.resize')
      if (!res.empty()) {
        var dx = d3.event.dx
        var dy = d3.event.dy
        res.each(function(d) {
          console.log('\nresizing', dx, dy, d.layout.handle, d.content.id)
          console.log('resizing', d.layout.handle, d.layout.layout.rect)
          switch (d.layout.handle) {
            case 'n':
              d.layout.layout.height -= dy
              d.layout.layout.y += dy
              break
            case 's':
              d.layout.layout.height += dy
              break
            case 'e':
              d.layout.layout.width += dx
              break
            case 'w':
              d.layout.layout.width -= dx
              d.layout.layout.x += dx
              break
            case 'nw':
              d.layout.layout.height -= dy
              d.layout.layout.y += dy
              d.layout.layout.width -= dx
              d.layout.layout.x += dx
              break
            case 'ne':
              d.layout.layout.height -= dy
              d.layout.layout.y += dy
              d.layout.layout.width += dx
              break
            case 'se':
              d.layout.layout.height += dy
              d.layout.layout.width += dx
              break
            case 'sw':
              d.layout.layout.height += dy
              d.layout.layout.width -= dx
              d.layout.layout.x += dx
              break
          }
        })
        redraw(false, res)
      } else {
				Layout.prototype.mouseMove(d)
        var dx = Math.min(
          Layout.canvas.size.width +
            Layout.offset.x -
            (d.layout.layout.width + d.layout.layout.x),
          d3.event.dx
        )
        dx = Math.max(dx, Math.max(-d.layout.layout.x))

        var dy = Math.min(
          Layout.canvas.size.height +
            Layout.offset.y -
            (d.layout.layout.height + d.layout.layout.y),
          d3.event.dy
        )
        dy = Math.max(dy, Math.max(-d.layout.layout.y))

        d.layout.layout.x += dx
        d.layout.layout.y += dy
        if (!waitForCompletion) redraw(false, d3.select(this)) //if waitForCompletion, someone else cares about this redraw
      }
    })
    .on('end', function(d) {
      behavemode = B_NONE

      var res = d3.selectAll('.resize').classed('resize', false)
      if (!res.empty()) {
        res.each(function(d) {
          d.layout.roundLayout()
          d.layout.saveLayout('original')
        })

        //			Layout.canvas.on("mousemove", Layout.prototype.mouseMove)
      } else {
        d3.select(this).classed('dragging', false)
        Layout.canvas.style('cursor', 'default')

        d3.select('.dragmover').classed('dragmover', false)

        if (Layout.style == 'manhatten') d.layout.restoreFrom('droptarget')

        d3.selectAll('.tile').each(function(d) {
          d.layout.saveLayout('original')
        })
        waitForCompletion = false
        updateContentArea(d)

        redraw(true, d3.select(this), function(d) {
          console.log('redraw completed in dragend for', d)
        })

        d3.select(this).call(setContent)
      }
    })
	})

}

Layout.prototype.style = function(style) {
  if (!style) return Layout.style
  if (style != 'manhatten' && style != 'source') style = 'source'
  if (style != Layout.style) {
    d3.selectAll('.tile').each(function(d) {
      if (d.layout.hasLayout(style + '_lyo'))
        d.layout.restoreFrom(style + '_lyo')
    })
  }
  if (style === 'manhatten') retile(false)
  return (Layout.style = style)
}

Layout.prototype.getCanvas = function() {
  return Layout.canvas
}

Layout.prototype.delegate = function(type, delegate) {
  console.log('type of delegate', type, typeof delegate)
  if (delegate && typeof delegate === 'function')
    Layout.delegates[type] = delegate
  else throw new Error("Delegate for '" + type + "' must be a function")

  return Layout.delegates[type]
}

Layout.prototype.touchMove = function(d) {
  d3.selectAll('.tile').each(function(d) {
    //		if (d3.select(this).classed("dragging")) return;
    if (d.layout.isInside(d3.touch(this))) {
      d3.select(this).call(Layout.prototype.enterTile)
    }
  })
}

function tilesEW(tile, start) {
  function between(a, x, b) {
    return x > a && x < b
  }
  d3.selectAll('.tile').each(function(d) {
    if (tile == d) {
      //			d3.select(this).classed("resize", true)
      return
    }
    var handle = tile.layout.handle

    var x, dx, tyt, tyb, dyt, dyb, ohandle

    tyt = tile.layout.layout.tile.top
    tyb = tile.layout.layout.tile.bottom

    dyt = d.layout.layout.tile.top
    dyb = d.layout.layout.tile.bottom

    switch (handle) {
      case 'w':
      case 'nw':
      case 'sw':
        x = tile.layout.layout.tile.left
        dx = Math.abs(x - d.layout.layout.tile.right)
        ohandle = 'e'
        break
      case 'e':
      case 'ne':
      case 'se':
        x = tile.layout.layout.tile.right
        dx = Math.abs(x - d.layout.layout.tile.left)
        ohandle = 'w'
        break
      default:
        return
    }

    var b =
      between(dyt, tyt, dyb) ||
      between(dyt, tyb, dyb) ||
      between(tyt, dyt, tyb) ||
      between(tyt, dyb, tyb)
    var e = Math.abs(dyt - tyt) < 2 || Math.abs(dyb - tyb) < 2

    console.log(
      '\ntilesEW:',
      tile.content.id,
      'thandle',
      tile.layout.handle,
      'd',
      d.content.id,
      'dhandle:',
      d.layout.handle,
      'start:',
      start ? start.content.id : start
    )

    if (dx <= 2 && (b || e)) {
      if (!d.layout.handle || d.layout.handle.length <= 1)
        d.layout.handle =
          (d.layout.handle == 'n' || d.layout.handle == 's'
            ? d.layout.handle
            : '') + ohandle
      if (!d3.select(this).classed('resize')) {
        console.log('added', d.content.id, dx, b, e, dyt, dyb, tyt, tyb)
        d3.select(this).classed('resize', true)
        tilesEW(d, start)
      } else console.log('already marked')
    } else console.log('no match', tile.content.id, d.content.id, dx, b, e)
  })
}

function tilesNS(tile, start) {
  function between(a, x, b) {
    return x > a && x < b
  }

  d3.selectAll('.tile').each(function(d) {
    if (tile == d) {
      d3.select(this).classed('resize', true)
      return
    }
    var handle = tile.layout.handle

    var y, dy, txl, txr, dxl, dxr, ohandle

    txl = tile.layout.layout.tile.left
    txr = tile.layout.layout.tile.right

    dxl = d.layout.layout.tile.left
    dxr = d.layout.layout.tile.right

    switch (handle) {
      case 'n':
      case 'nw':
      case 'ne':
        y = tile.layout.layout.tile.top
        dy = Math.abs(y - d.layout.layout.tile.bottom)
        ohandle = 's'
        break
      case 's':
      case 'sw':
      case 'se':
        y = tile.layout.layout.tile.bottom
        dy = Math.abs(y - d.layout.layout.tile.top)
        ohandle = 'n'
        break
      default:
        return
    }

    var b =
      between(dxl, txl, dxr) ||
      between(dxl, txr, dxr) ||
      between(txl, dxl, txr) ||
      between(txl, dxr, txr)
    var e = Math.abs(dxl - txl) < 2 || Math.abs(dxr - txr) < 2

    console.log(
      '\ntilesNW:',
      tile.content.id,
      'thandle',
      tile.layout.handle,
      'd',
      d.content.id,
      'dhandle:',
      d.layout.handle,
      'start:',
      start ? start.content.id : start
    )

    if ((dy <= 2 && b) || (dy <= 2 && e)) {
      if (!d.layout.handle || d.layout.handle.length <= 1)
        d.layout.handle =
          ohandle +
          (d.layout.handle == 'w' || d.layout.handle == 'e'
            ? d.layout.handle
            : '')
      if (!d3.select(this).classed('resize')) {
        console.log('added', d.content.id, dy, b, e)
        d3.select(this).classed('resize', true)
        tilesNS(d, start)
      } else console.log('already marked')
    } else console.log('no match', tile.content.id, d.content.id, dy, b, e)
  })
}
function collectResizables() {
  var tiles = d3
    .selectAll('.tile')
    .select(function(d) {
      return d.layout.handle && d.layout.handle != 'c' ? this : null
    })
    .each(function(d) {
      tilesNS(d, d)
      tilesEW(d, d)
    })
    .classed('resize', true)

  d3.selectAll('.tiles').call(displayHandles)
}

Layout.prototype.mouseMove = function(d) {
  if (behavemode == B_RESIZING || waitForCompletion) return
  var tup = [] //tiles under pointer
  var tiles = d3.selectAll('.tile')

  if (!behavemode) {
    tiles
      .classed('resize', false)
      .classed('grab', false)
      .each(function(d) {
        d.layout.handle = null
      })
  }

  d3.selectAll('.handle').remove()

  tiles.each(function(d, idx) {
    d.layout.handle = null
    // console.log('isInside mouse', idx, d3.mouse(this)[0] - d.layout.layout.width)
    if (
      d.layout.isInside(
        d3.mouse(this),
        function(handle, sel) {
          if (behavemode) return
          d.layout.handle = handle
          if (handle == 'c') sel.classed('grab', true)
          tup.push(handle)
        },
        d3.select(this)
      )
    ) {
      d3.select(this).call(Layout.prototype.enterTile)
    }
  })

  // console.log('handles', tup)
  tiles.call(displayHandles)

  if (behavemode) return

  var ctype = 'default'
  var tl = tup.length
  if (tl > 2) ctype = 'move'
  else if (tl == 2) {
    switch (tup[1]) {
      case 'n':
      case 's':
        ctype = 'row-resize'
        break
      case 'w':
      case 'e':
        ctype = 'col-resize'
        break
    }
  }
  //	else if (tl && tl > 0 && tup[0].handle == "c") ctype = "grab"
  Layout.canvas.style('cursor', ctype)
}

function displayHandles(sel) {
  sel.each(function(d) {
    var hrect = d.layout.getHandleRect()
    if (hrect) {
      d3
        .select(this)
        .insert('div')
        .classed('handle', true)
        .style('top', hrect.top + 'px')
        .style('left', hrect.left + 'px')
        .style('width', hrect.right - hrect.left + 'px')
        .style('height', hrect.bottom - hrect.top + 'px')
    }
  })
}

Layout.prototype.dragTile = function(de) {}

Layout.prototype.enterTile = function(desel) {

  if (behavemode != B_DRAGGING) return
  var drg = d3.select('.dragging')
  if (drg.empty()) return

  desel.each(function(entered) {
    var dragee = drg.datum()
    console.log('entered', entered.content.id, 'dragee', dragee.content.id, waitForCompletion)
    d3.selectAll('.tile').classed('redrawer', false)
    if (dragee != entered) {
      entered.layout.saveLayout('dragsource')
      dragee.layout.saveLayout('droptarget', entered.layout)
      console.log('dragee saved to droptarget', entered.layout.layout.rect)

      //  tile entered, restore all original positions and swap 2 tiles afterwards
      d3.selectAll('.tile').each(function(d) {
        if (d != dragee) {
          if (d.layout.restoreFrom('original'))
            d3.select(this).classed('redrawer', true)
          //					console.log("restored", d.content.id, d.layout.layout.rect)
        } else d3.select(this).classed('redrawer', true)
      })

      var mvr = d3.select('.dragmover')
      var isMover = !mvr.empty() && mvr.datum() == entered

      if (!isMover) {
        entered.layout.restoreFrom('dragsource', dragee.layout)
        dragee.layout.restoreFrom('dragsource', entered.layout)

        console.log('is not Mover, entered:', entered.layout.layout.rect)
      } else {
        dragee.layout.restoreFrom('droptarget')
        console.log('is Mover, dragee:', dragee.layout.layout.rect)
      }

      d3.selectAll('.dragmover').classed('dragmover', false)
      if (!isMover) desel.classed('dragmover', true)
      desel.classed('redrawer', true)
    }
  })
  var redrawers = d3.selectAll('.redrawer')
  if (!redrawers.empty()) {
    redraw(true, redrawers, function(d) {
      d3.selectAll('.redrawer').classed('redrawer', false)
    })
  }
}

function swap(t1, t2) {
  console.log('t1', t1.layout.content.id, t1.layout.layout.rect)
  console.log('t2', t2.layout.content.id, t2.layout.layout.rect)
  var t = t1.layout.layout.rect
  t1.layout.layout.rect = t2.layout.layout.rect
  t2.layout.layout.rect = t
  console.log('*t1', t1.layout.content.id, t1.layout.layout.rect)
  console.log('*t2', t2.layout.content.id, t2.layout.layout.rect)
}

function printit(mess, dd, de) {
  console.log('\n' + mess)
  console.log('Dragee', dd.layout.layout.rect, dd.content.id)
  if (de) console.log('Mover', de.layout.layout.rect, de.content.id)
}
Layout.prototype.leaveTile = function(d, i) {}

Layout.prototype.selectTile = function(d) {
  if (Layout.delegates.select) Layout.delegates.select(d, d3.mouse(this))

  //		console.log("click",i, d3.mouse(this))
}

Layout.prototype.updateLayout = function() {
  var tiles = Layout.canvas.selectAll('.tile').data(Layout.tiles)

console.log('updateLayout data:', Layout.tiles)

  tiles.exit().remove()

  var newtiles = tiles
    .enter()
    .append('div')
    .attr('class', 'tile')
    .call(Layout.drag)

  //	newtiles.append("div")
  //	.attr("class", "header")
  //	.append("span")
  //	.attr("class", "htext")
  //
  newtiles
    .append('div')
    .attr('id', function(d) {
      return d.content.id
    })
    .attr('class', 'content')

  newtiles.each(function(d, i) {
    if (Layout.delegates.initial) Layout.delegates.initial(d)
    if (!d.layout) d.layout = new Tile()
  })
  biggestCommonGrid()
  retile(false)
  redraw(true)
}

function setContent(content, mode) {
  if (mode == undefined) mode = ''
  if (mode == 'dragging' || mode == 'resizing') return
  content.each(function(d) {
    console.log('Calling draw', this, d, mode)
    // Layout.delegates.draw(this, mode)
    d3.select(this).call(Layout.delegates.draw, mode)
  })
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/mmc [rev. #1]

let mmc = function(o) {
  /*
	 mmc(numbers: Array): Integer
    Returns the least nubmer able to be divided by all the numbers passed as parameter, the least common multiple.
    numbers array of integer numbers
*/
  for (var i, j, n, d, r = 1; (n = o.pop()) != undefined; )
    while (n > 1) {
      if (n % 2) {
        for (i = 3, j = Math.floor(Math.sqrt(n)); i <= j && n % i; i += 2);
        d = i <= j ? i : n
      } else d = 2
      for (
        n /= d, r *= d, i = o.length;
        i;
        !(o[--i] % d) && (o[i] /= d) == 1 && o.splice(i, 1)
      );
    }
  return r
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/mmc [rev. #1]
let mdc = function(numbers) {
  /*
 * mdc(numbers: Array): Integer
    Returns the greatest number able to divide all the numbers in the first argument, the greatest common divisor.
    numbers array of integer numbers
*/
  if (!numbers.length) return 0
  for (var r, a, i = numbers.length - 1, b = numbers[i]; i; )
    for (a = numbers[--i]; (r = a % b); a = b, b = r);
  return b
}

function biggestCommonGrid(fill = false) {
  // calculate the biggest possible grid, where all tiles fit into an integer number of cells
  var res = 10
  var widths = [Math.floor(Layout.canvas.size.width / res) * res]
  var heights = [Math.floor(Layout.canvas.size.height / res) * res]
  Layout.tiles.forEach(function(d, idx) {
    let gwidth = Math.floor(d.layout.layout.width / res) * res
    let gheight = Math.floor(d.layout.layout.height / res) * res
    widths.push(gwidth)
    heights.push(gheight)
    //		widths.max = (d.layout.layout.width > widths.max ? d.layout.layout.width : widths.max)
    //		heights.min = (d.layout.layout.height < heights.min ? d.layout.layout.height : heights.min)
    //		heights.max = (d.layout.layout.height > heights.max ? d.layout.layout.height : heights.max)
  })
  console.log(`bcg_2 canvas: ${Layout.canvas.size.width}, ${Layout.canvas.size.height}`)
  var xgrid = mdc(widths)
  var ygrid = mdc(heights)
  console.log(`bcg_2, xgrid of ${widths}: ${xgrid}`)
  console.log(`bcg_2, ygrid of ${heights}: ${ygrid}`)

  Layout.tiles.forEach(function(d, idx) {
    let gw = Math.floor(d.layout.layout.width / xgrid)
    let x = Math.floor(d.layout.layout.x) - Math.round(Layout.offset.x)
    let newx = 0
    console.log( `bcg_3, Tile ${idx}: w=${d.layout.layout.width}\nxg=${xgrid}\ngw=${gw}, ${xgrid * gw}\nx=${x}, ${Math.floor(Layout.offset.x)}`)
    // console.log( 'bcg_3x',
    //   d.layout.layout.height,
    //   Math.round(d.layout.layout.height / ygrid),
    //   ygrid * Math.round(d.layout.layout.height / ygrid)
    // )
  })
}

function retile(fill) {
  if (Layout.style == 'source') return

  var newlen = Layout.tiles.length

  console.log('retile', newlen)

  var Nc = Math.ceil(Math.sqrt(newlen))
  var Nr = Math.floor(Math.sqrt(newlen))
  if (Nc * Nr < newlen) Nr = Nc

  var cols = [].fill.call({ length: Nr }, Nc)

  let delta = Nc * Nr - newlen
  if (fill) {
    var last = cols.length - 1
    cols[last] -= delta
    for (var i = 0; i < last && cols[last] < Nc; i++) {
      cols[last]++
      cols[i]--
      //			console.log(i, ":", cols[last], cols[i])
    }
  }

  console.log('N tiles:', Layout.tiles.length, Nr, Nc, cols)
  var sx = []
  for (var i = 0; i < cols.length; i++) {
    // sx[i] = d3.scaleOrdinal()  // changed in vsn 5 of d3 *******************************************************************************************
    // .domain(d3.range(cols[i]))
    // .rangeRoundBands([Layout.offset.x,Layout.canvas.size.width + Layout.offset.x])
		console.log("cols", i, cols[i], d3.range(cols[i]))
    sx[i] = d3
      .scaleBand()
      .domain(d3.range(cols[i]))
      .rangeRound([Layout.offset.x, Layout.canvas.size.width + Layout.offset.x])
    // .padding(0.2)
    console.log('sx range', i, sx[i].range(), d3.range(cols[i]))
  }

  // var sy = d3.scale.ordinal()
  // .domain(d3.range(Nr))
  // .rangeRoundBands([Layout.offset.y,Layout.canvas.size.height+Layout.offset.y])
  var sy = d3
    .scaleBand()
    .domain(d3.range(Nr))
    .rangeRound([Layout.offset.y, Layout.canvas.size.height + Layout.offset.y])

  console.log('sy range', sy.range(), d3.range(Nr))

  Layout.tiles.forEach(function(d, idx) {
    var c = 0,
      rx = -1,
      r = 0

    while (rx < idx) {
      rx += cols[r++]
    }
    r--

    c = cols[r] - (rx - idx) - 1
    //		r = Math.floor(idx/Nr);
    //		console.log("idx:", idx, "(r,c):(", r, c, ")")
    if (!d.layout) d.layout = new Tile()
    //		console.log("new tile 1", d.layout)

    //		console.log(idx,":",c,r, newlen,delta)
    d.layout.layout.width = sx[r].bandwidth() //.range()[1]
		console.log('sx range', r, sx[r].bandwidth(), 'sy range', sy.bandwidth())
    if (!fill && idx === (newlen - 1)) {
			console.log('retile 4:', fill, Layout.canvas.size.width, cols[r], delta, sx[r].bandwidth(), 'result', Layout.canvas.size.width - (cols[r] - delta - 1) * sx[r].bandwidth())
      d.layout.layout.width =
        Layout.canvas.size.width - (cols[r] - delta - 1) * sx[r].bandwidth() //.range()[1]
			}
    d.layout.layout.height = sy.bandwidth()
    d.layout.layout.origin = { x: sx[r](c), y: sy(r) }
    d.layout.content = {
      top: sy(r) + Layout.margins.top,
      left: sx[r](c) + Layout.margins.left,
      width: d.layout.layout.width - Layout.margins.left - Layout.margins.right,
      height: d.layout.layout.height - Layout.margins.top - Layout.margins.bottom
    }

    console.log('retile 3:', fill, sx[r].bandwidth(), d.layout.layout.width) // , d.layout.layout.height, c,r, 'content', d.layout.content)
  })
  console.log('retile 2', Layout.tiles.length)
}

/*function updateContentArea(d) {
	var tr = getTranslate(d.layout.o);
	d.layout.content.top = tr[1] + Layout.margins.top;
	d.layout.content.left = tr[0] + Layout.margins.left;
	d.layout.content.width = d.layout.layout.width - Layout.margins.left - Layout.margins.right
	d.layout.content.height = d. layout.h - Layout.margins.top - Layout.margins.bottom
}
 */
function updateContentArea(d) {
  return
  // d.layout.content.top = Layout.margins.top
  // d.layout.content.left = Layout.margins.left
  // d.layout.content.width =
  //   d.layout.layout.width - Layout.margins.left - Layout.margins.right
  // d.layout.content.height =
  //   d.layout.layout.height - Layout.margins.top - Layout.margins.bottom
}

function redraw(animated /* : boolean */, tiles /*: any */, done /*: ?function */) {

  if (tiles == undefined) tiles = d3.selectAll('.tile')
  var off = Layout.style != 'manhatten' ? Layout.offset : { x: 0, y: 0 } // manhatten tiles are already offset
  var mode = ['', 'resizing', 'dragging'][behavemode]

  if (false && animated) { // this block just fon debugging
    console.log('\nredrawing', animated ? 'animated' : 'not animated')
    tiles.each(function(d) {
      console.log(
        d.content.id,
        d.content.id,
        d3.select(this).attr('class'),
        d.layout.layout.rect
      )
    })
    console.log('\n')
  }
  if (behavemode != B_RESIZING && animated) {
    waitForCompletion = true
    tiles
      .transition()
      .duration(300)
      .style('left', function(d) {
        return d.layout.layout.x + off.x + 'px'
      })
      .style('top', function(d) {
        return d.layout.layout.y + off.y + 'px'
      })
      .style('width', function(d) {
        return d.layout.layout.width + 'px'
      })
      .style('height', function(d) {
        return d.layout.layout.height + 'px'
      })
			.on('end', function () {
        console.log('All the anim transitions have ended!')
        tiles.call(setContent, behavemode)
        waitForCompletion = false
        if (typeof done === 'function') done()
      })
  } else {
    tiles
      .style('left', function(d) {
        return d.layout.layout.x + off.x + 'px'
      })
      .style('top', function(d) {
        return d.layout.layout.y + off.y + 'px'
      })
      .style('width', function(d) {
        return d.layout.layout.width + 'px'
      })
      .style('height', function(d) {
        return d.layout.layout.height + 'px'
      })
      .each(function(d) {
        d3.select(this).call(setContent, behavemode)
        if (typeof done === 'function') d3.select(this).call(done)
        if (behavemode != B_RESIZING) {
        }
      })
  }
biggestCommonGrid()
  //	d3.selectAll(".tile").call(setContent, mode)
}

function getTranslate(t) {
  var tr = t.split(/[(),]/)
  if (tr[0] !== 'translate') return null
  return [Number(tr[1]), Number(tr[2])]
}
