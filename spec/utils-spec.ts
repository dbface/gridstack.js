import { Utils } from '../src/utils';

describe('gridstack utils', function() {
  'use strict';

  describe('setup of utils', function() {
    it('should set gridstack Utils.', function() {
      let utils = Utils;
      expect(utils).not.toBeNull();
      expect(typeof utils).toBe('function');
    });
  });

  describe('test toBool', function() {
    it('should return booleans.', function() {
      expect(Utils.toBool(true)).toEqual(true);
      expect(Utils.toBool(false)).toEqual(false);
    });
    it('should work with integer.', function() {
      expect(Utils.toBool(1)).toEqual(true);
      expect(Utils.toBool(0)).toEqual(false);
    });
    it('should work with Strings.', function() {
      expect(Utils.toBool('')).toEqual(false);
      expect(Utils.toBool('0')).toEqual(false);
      expect(Utils.toBool('no')).toEqual(false);
      expect(Utils.toBool('false')).toEqual(false);
      expect(Utils.toBool('yes')).toEqual(true);
      expect(Utils.toBool('yadda')).toEqual(true);
    });
  });

  describe('test isIntercepted', function() {
    let src = {x: 3, y: 2, width: 3, height: 2};

    it('should intercept.', function() {
      expect(Utils.isIntercepted(src, {x: 0, y: 0, width: 4, height: 3})).toEqual(true);
      expect(Utils.isIntercepted(src, {x: 0, y: 0, width: 40, height: 30})).toEqual(true);
      expect(Utils.isIntercepted(src, {x: 3, y: 2, width: 3, height: 2})).toEqual(true);
      expect(Utils.isIntercepted(src, {x: 5, y: 3, width: 3, height: 2})).toEqual(true);
    });
    it('shouldn\'t intercept.', function() {
      expect(Utils.isIntercepted(src, {x: 0, y: 0, width: 3, height: 2})).toEqual(false);
      expect(Utils.isIntercepted(src, {x: 0, y: 0, width: 13, height: 2})).toEqual(false);
      expect(Utils.isIntercepted(src, {x: 1, y: 4, width: 13, height: 2})).toEqual(false);
      expect(Utils.isIntercepted(src, {x: 0, y: 3, width: 3, height: 2})).toEqual(false);
      expect(Utils.isIntercepted(src, {x: 6, y: 3, width: 3, height: 2})).toEqual(false);
    });
  });

  describe('test createStylesheet/removeStylesheet', function() {

    it('should create/remove style DOM', function() {
      let _id = 'test-123';
      Utils.createStylesheet(_id);

      let style = $('STYLE[data-gs-style-id=' + _id + ']');
      expect(style.length).toEqual(1);
      expect(style.prop('tagName')).toEqual('STYLE');

      Utils.removeStylesheet(_id)
      style = $('STYLE[data-gs-style-id=' + _id + ']');
      expect(style.length).toEqual(0);
    });

  });

  describe('test parseHeight', function() {

    it('should parse height value', function() {
      expect(Utils.parseHeight(12)).toEqual(jasmine.objectContaining({height: 12, unit: 'px'}));
      expect(Utils.parseHeight('12px')).toEqual(jasmine.objectContaining({height: 12, unit: 'px'}));
      expect(Utils.parseHeight('12.3px')).toEqual(jasmine.objectContaining({height: 12.3, unit: 'px'}));
      expect(Utils.parseHeight('12.3em')).toEqual(jasmine.objectContaining({height: 12.3, unit: 'em'}));
      expect(Utils.parseHeight('12.3rem')).toEqual(jasmine.objectContaining({height: 12.3, unit: 'rem'}));
      expect(Utils.parseHeight('12.3vh')).toEqual(jasmine.objectContaining({height: 12.3, unit: 'vh'}));
      expect(Utils.parseHeight('12.3vw')).toEqual(jasmine.objectContaining({height: 12.3, unit: 'vw'}));
      expect(Utils.parseHeight('12.3%')).toEqual(jasmine.objectContaining({height: 12.3, unit: '%'}));
      expect(Utils.parseHeight('12.5')).toEqual(jasmine.objectContaining({height: 12.5, unit: 'px'}));
      expect(function() { Utils.parseHeight('12.5 df'); }).toThrowError('Invalid height');
    });

    it('should parse negative height value', function() {
      expect(Utils.parseHeight(-12)).toEqual(jasmine.objectContaining({height: -12, unit: 'px'}));
      expect(Utils.parseHeight('-12px')).toEqual(jasmine.objectContaining({height: -12, unit: 'px'}));
      expect(Utils.parseHeight('-12.3px')).toEqual(jasmine.objectContaining({height: -12.3, unit: 'px'}));
      expect(Utils.parseHeight('-12.3em')).toEqual(jasmine.objectContaining({height: -12.3, unit: 'em'}));
      expect(Utils.parseHeight('-12.3rem')).toEqual(jasmine.objectContaining({height: -12.3, unit: 'rem'}));
      expect(Utils.parseHeight('-12.3vh')).toEqual(jasmine.objectContaining({height: -12.3, unit: 'vh'}));
      expect(Utils.parseHeight('-12.3vw')).toEqual(jasmine.objectContaining({height: -12.3, unit: 'vw'}));
      expect(Utils.parseHeight('-12.3%')).toEqual(jasmine.objectContaining({height: -12.3, unit: '%'}));
      expect(Utils.parseHeight('-12.5')).toEqual(jasmine.objectContaining({height: -12.5, unit: 'px'}));
      expect(function() { Utils.parseHeight('-12.5 df'); }).toThrowError('Invalid height');
    });
  });

  describe('test defaults', function() {
    it('should assign missing field or undefined', function() {
      let src: any = {};
      expect(src).toEqual({});
      expect(Utils.defaults(src, {x: 1, y: 2})).toEqual({x: 1, y: 2});
      expect(Utils.defaults(src, {x: 10})).toEqual({x: 1, y: 2});
      src.width = undefined;
      expect(src).toEqual({x: 1, y: 2, width: undefined});
      expect(Utils.defaults(src, {x: 10, width: 3})).toEqual({x: 1, y: 2, width: 3});
      expect(Utils.defaults(src, {height: undefined})).toEqual({x: 1, y: 2, width: 3, height: undefined});
    });
  });

  describe('clone', function() {
    it('should match content', function() {
      let a = [1,2,3];
      let v1 = {one: 1, two: 'two', three: a};
      let v2: any = Utils.clone(v1);
      expect(v1 === v2).toBeFalse();
      expect(v1.one).toEqual(v2.one);
      expect(v1.two).toEqual(v2.two);
      expect(v1.three).toEqual(v2.three);
    });
  });

  describe('removePositioningStyles', function() {
    it('should remove styles', function() {
      let doc = document.implementation.createHTMLDocument();
      doc.body.innerHTML = '<div style="position: absolute; left: 1; top: 2; width: 3; height: 4"></div>';
      let el = doc.body.children[0] as HTMLElement;
      expect(el.style.position).toEqual('absolute');
      // expect(el.style.left).toEqual('1'); // not working!

      Utils.removePositioningStyles(el);
      expect(el.style.position).toEqual('');

      // bogus test
      expect(Utils.getScrollParent(el)).toEqual(null);
      // bogus test
      Utils.updateScrollPosition(el, {top: 20}, 10);
    });
  });

});
