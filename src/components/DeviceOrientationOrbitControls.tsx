import * as THREE from "three";
import { Camera, MOUSE, TOUCH, Vector3, EventDispatcher } from "three";

import * as React from "react";
import { ReactThreeFiber, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// copied from https://stackoverflow.com/questions/35023076/orbiting-around-the-origin-using-a-devices-orientation
// and modified so that the scene orbits with device orientation, and all other controls (mousemouve, touchmove etc) are disabled

/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */

// This set of controls performs orbiting, dollying (zooming), and panning. It maintains
// the "up" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is
// supported.
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finter swipe

class OrbitControls extends EventDispatcher {
  object: Camera;
  domElement: any;
  // domElement: HTMLElement | Document|undefined;
  // Set to false to disable this control
  enabled = true;
  tiltEnabled;
  tiltSpeed;
  // "target" sets the location of focus, where the object orbits around
  target = new Vector3();
  // How far you can dolly in and out ( PerspectiveCamera only )
  minDistance = 0;
  maxDistance = Infinity;
  // How far you can zoom in and out ( OrthographicCamera only )
  minZoom = 0;
  maxZoom = Infinity;
  // How far you can orbit vertically, upper and lower limits.
  // Range is 0 to Math.PI radians.
  minPolarAngle = 0; // radians
  maxPolarAngle = Math.PI; // radians
  // How far you can orbit horizontally, upper and lower limits.
  // If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )
  minAzimuthAngle = -Infinity; // radians
  maxAzimuthAngle = Infinity; // radians
  // Set to true to enable damping (inertia)
  // If damping is enabled, you must call controls.update() in your animation loop
  enableDamping = false;
  dampingFactor = 0.05;
  // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
  // Set to false to disable zooming
  enableZoom = true;
  zoomSpeed = 1.0;
  // Set to false to disable rotating
  enableRotate = true;
  rotateSpeed = 1.0;
  // Set to false to disable panning
  enablePan = true;
  panSpeed = 1.0;
  screenSpacePanning = true; // if false, pan orthogonal to world-space direction camera.up
  keyPanSpeed = 7.0; // pixels moved per arrow key push
  // Set to true to automatically rotate around the target
  // If auto-rotate is enabled, you must call controls.update() in your animation loop
  autoRotate = false;
  autoRotateSpeed = 2.0; // 30 seconds per orbit when fps is 60
  // The four arrow keys
  keys = {
    LEFT: "ArrowLeft",
    UP: "ArrowUp",
    RIGHT: "ArrowRight",
    BOTTOM: "ArrowDown",
  };
  // Mouse buttons
  mouseButtons = {
    LEFT: MOUSE.ROTATE,
    MIDDLE: MOUSE.DOLLY,
    RIGHT: MOUSE.PAN,
  };
  // Touch fingers
  touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN };
  target0: Vector3;
  position0: Vector3;
  zoom0: number;
  // the target DOM element for key events
  _domElementKeyEvents: any = null;

  getPolarAngle: () => number;
  getAzimuthalAngle: () => number;
  reset: () => void;
  update: () => void;
  connect: (domElement: HTMLElement) => void;
  dispose: () => void;
  panUp: Function;
  rotateLeft: Function;
  rotateUp: Function;
  panLeft: Function;
  pan: Function;

  constructor(object: Camera, domElement?: HTMLElement | Document) {
    super();
    // super(object, domElement);

    this.object = object;
    this.domElement = domElement !== undefined ? domElement : document;

    // API

    // Set to false to disable this control
    this.enabled = true;

    // "target" sets the location of focus, where the control orbits around
    // and where it pans with respect to.
    this.target = new THREE.Vector3();

    // center is old, deprecated; use "target" instead
    // this.center = this.target;

    // This option actually enables dollying in and out; left as "zoom" for
    // backwards compatibility
    // this.noZoom = false;
    this.zoomSpeed = 1.0;

    // Limits to how far you can dolly in and out ( PerspectiveCamera only )
    this.minDistance = 0;
    this.maxDistance = Infinity;

    // Limits to how far you can zoom in and out ( OrthographicCamera only )
    this.minZoom = 0;
    this.maxZoom = Infinity;

    // Set to true to disable this control
    // this.noRotate = false;
    this.rotateSpeed = 1.0;

    // Disabled by default
    this.tiltEnabled = false;
    this.tiltSpeed = 0.01; // you might want an multiplier for iOS

    // Set to true to disable this control
    // this.noPan = false;
    this.keyPanSpeed = 7.0; // pixels moved per arrow key push

    // Set to true to automatically rotate around the target
    this.autoRotate = false;
    this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

    // How far you can orbit vertically, upper and lower limits.
    // Range is 0 to Math.PI radians.
    this.minPolarAngle = 0; // radians
    this.maxPolarAngle = Math.PI; // radians

    // How far you can orbit horizontally, upper and lower limits.
    // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
    this.minAzimuthAngle = -Infinity; // radians
    this.maxAzimuthAngle = Infinity; // radians

    // Set to true to disable use of the keys
    // this.noKeys = false;

    // The four arrow keys
    // this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

    // Mouse buttons
    // this.mouseButtons = {
    //   ORBIT: THREE.MOUSE.LEFT,
    //   ZOOM: THREE.MOUSE.MIDDLE,
    //   PAN: THREE.MOUSE.RIGHT,
    // };

    ////////////
    // internals

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    var scope = this;

    var EPS = 0.000001;

    var rotateStart = new THREE.Vector2();
    var rotateEnd = new THREE.Vector2();
    var rotateDelta = new THREE.Vector2();

    // var panStart = new THREE.Vector2();
    // var panEnd = new THREE.Vector2();
    // var panDelta = new THREE.Vector2();
    var panOffset = new THREE.Vector3();

    var offset = new THREE.Vector3();

    // var dollyStart = new THREE.Vector2();
    // var dollyEnd = new THREE.Vector2();
    // var dollyDelta = new THREE.Vector2();

    var theta;
    var phi;
    var phiDelta = 0;
    var thetaDelta = 0;
    var scale = 1;
    var pan = new THREE.Vector3();

    var lastPosition = new THREE.Vector3();
    var lastQuaternion = new THREE.Quaternion();

    var STATE = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_DOLLY: 4,
      TOUCH_PAN: 5,
    };

    var state = STATE.NONE;

    // for reset

    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = (this.object as any).zoom;

    // so camera.up is the orbit axis

    var quat = new THREE.Quaternion().setFromUnitVectors(
      object.up,
      new THREE.Vector3(0, -1, 0)
    );
    var quatInverse = quat.clone().invert();

    // events

    var changeEvent = { type: "change" };
    // var startEvent = { type: "start" };
    // var endEvent = { type: "end" };

    this.rotateLeft = function (angle) {
      if (angle === undefined) {
        angle = getAutoRotationAngle();
      }

      thetaDelta -= angle;
    };

    this.rotateUp = function (angle) {
      if (angle === undefined) {
        angle = getAutoRotationAngle();
      }

      phiDelta -= angle;
    };

    // pass in distance in world space to move left
    this.panLeft = function (distance) {
      var te = this.object.matrix.elements;

      // get X column of matrix
      panOffset.set(te[0], te[1], te[2]);
      panOffset.multiplyScalar(-distance);

      pan.add(panOffset);
    };

    // pass in distance in world space to move up
    this.panUp = function (distance) {
      var te = this.object.matrix.elements;

      // get Y column of matrix
      panOffset.set(te[4], te[5], te[6]);
      panOffset.multiplyScalar(distance);

      pan.add(panOffset);
    };

    // pass in x,y of change desired in pixel space,
    // right and down are positive
    this.pan = function (deltaX, deltaY) {
      var element =
        scope.domElement === document
          ? scope.domElement.body
          : scope.domElement;

      if (scope.object instanceof THREE.PerspectiveCamera) {
        // perspective
        var position = scope.object.position;
        var offset = position.clone().sub(scope.target);
        var targetDistance = offset.length();

        // half of the fov is center to top of screen
        targetDistance *= Math.tan(((scope.object.fov / 2) * Math.PI) / 180.0);

        // we actually don't use screenWidth, since perspective camera is fixed to screen height
        scope.panLeft((2 * deltaX * targetDistance) / element.clientHeight);
        scope.panUp((2 * deltaY * targetDistance) / element.clientHeight);
      } else if (scope.object instanceof THREE.OrthographicCamera) {
        // orthographic
        scope.panLeft(
          (deltaX * (scope.object.right - scope.object.left)) /
            element.clientWidth
        );
        scope.panUp(
          (deltaY * (scope.object.top - scope.object.bottom)) /
            element.clientHeight
        );
      } else {
        // camera neither orthographic or perspective
        console.warn(
          "WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."
        );
      }
    };

    // this.dollyIn = function (dollyScale) {
    //   if (dollyScale === undefined) {
    //     dollyScale = getZoomScale();
    //   }

    //   if (scope.object instanceof THREE.PerspectiveCamera) {
    //     scale /= dollyScale;
    //   } else if (scope.object instanceof THREE.OrthographicCamera) {
    //     scope.object.zoom = Math.max(
    //       this.minZoom,
    //       Math.min(this.maxZoom, this.object.zoom * dollyScale)
    //     );
    //     scope.object.updateProjectionMatrix();
    //     scope.dispatchEvent(changeEvent);
    //   } else {
    //     console.warn(
    //       "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
    //     );
    //   }
    // };

    // this.dollyOut = function (dollyScale) {
    //   if (dollyScale === undefined) {
    //     dollyScale = getZoomScale();
    //   }

    //   if (scope.object instanceof THREE.PerspectiveCamera) {
    //     scale *= dollyScale;
    //   } else if (scope.object instanceof THREE.OrthographicCamera) {
    //     scope.object.zoom = Math.max(
    //       this.minZoom,
    //       Math.min(this.maxZoom, this.object.zoom / dollyScale)
    //     );
    //     scope.object.updateProjectionMatrix();
    //     scope.dispatchEvent(changeEvent);
    //   } else {
    //     console.warn(
    //       "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
    //     );
    //   }
    // };

    this.update = function () {
      var position = this.object.position;

      offset.copy(position).sub(this.target);

      // rotate offset to "y-axis-is-up" space
      offset.applyQuaternion(quat);

      // angle from z-axis around y-axis

      theta = Math.atan2(offset.x, offset.z);

      // angle from y-axis

      phi = Math.atan2(
        Math.sqrt(offset.x * offset.x + offset.z * offset.z),
        offset.y
      );

      if (this.autoRotate && state === STATE.NONE) {
        this.rotateLeft(getAutoRotationAngle());
      }

      theta += thetaDelta;
      phi += phiDelta;

      // restrict theta to be between desired limits
      theta = Math.max(
        this.minAzimuthAngle,
        Math.min(this.maxAzimuthAngle, theta)
      );

      // restrict phi to be between desired limits
      phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, phi));

      // restrict phi to be betwee EPS and PI-EPS
      phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));

      var radius = offset.length() * scale;

      // restrict radius to be between desired limits
      radius = Math.max(this.minDistance, Math.min(this.maxDistance, radius));

      // move target to panned location
      this.target.add(pan);

      offset.x = radius * Math.sin(phi) * Math.sin(theta);
      offset.y = radius * Math.cos(phi);
      offset.z = radius * Math.sin(phi) * Math.cos(theta);

      // rotate offset back to "camera-up-vector-is-up" space
      offset.applyQuaternion(quatInverse);

      position.copy(this.target).add(offset);

      this.object.lookAt(this.target);

      thetaDelta = 0;
      phiDelta = 0;
      scale = 1;
      pan.set(0, 0, 0);

      // update condition is:
      // min(camera displacement, camera rotation in radians)^2 > EPS
      // using small-angle approximation cos(x/2) = 1 - x^2 / 8

      if (
        lastPosition.distanceToSquared(this.object.position) > EPS ||
        8 * (1 - lastQuaternion.dot(this.object.quaternion)) > EPS
      ) {
        (this as any).dispatchEvent(changeEvent);

        lastPosition.copy(this.object.position);
        lastQuaternion.copy(this.object.quaternion);
      }
    };

    this.reset = function () {
      state = STATE.NONE;

      this.target.copy(this.target0);
      this.object.position.copy(this.position0);
      this.object.zoom = this.zoom0;

      this.object.updateProjectionMatrix();
      (this as any).dispatchEvent(changeEvent);

      this.update();
    };

    this.getPolarAngle = function () {
      return phi;
    };

    this.getAzimuthalAngle = function () {
      return theta;
    };

    function getAutoRotationAngle() {
      return ((2 * Math.PI) / 60 / 60) * scope.autoRotateSpeed;
    }

    // function getZoomScale() {
    //   return Math.pow(0.95, scope.zoomSpeed);
    // }

    // function onMouseDown(event) {
    //   if (scope.enabled === false) return;
    //   event.preventDefault();

    //   if (event.button === scope.mouseButtons.ORBIT) {
    //     if (scope.noRotate === true) return;

    //     state = STATE.ROTATE;

    //     rotateStart.set(event.clientX, event.clientY);
    //   } else if (event.button === scope.mouseButtons.ZOOM) {
    //     if (scope.noZoom === true) return;

    //     state = STATE.DOLLY;

    //     dollyStart.set(event.clientX, event.clientY);
    //   } else if (event.button === scope.mouseButtons.PAN) {
    //     if (scope.noPan === true) return;

    //     state = STATE.PAN;

    //     panStart.set(event.clientX, event.clientY);
    //   }

    //   if (state !== STATE.NONE) {
    //     // document.addEventListener("mousemove", onMouseMove, false);
    //     // document.addEventListener("mouseup", onMouseUp, false);
    //     scope.dispatchEvent(startEvent);
    //   }
    // }

    // function onMouseMove(event) {
    //   if (scope.enabled === false) return;

    //   event.preventDefault();

    //   var element =
    //     scope.domElement === document ? scope.domElement.body : scope.domElement;

    //   if (state === STATE.ROTATE) {
    //     if (scope.noRotate === true) return;

    //     rotateEnd.set(event.clientX, event.clientY);
    //     rotateDelta.subVectors(rotateEnd, rotateStart);

    //     // rotating across whole screen goes 360 degrees around
    //     scope.rotateLeft(
    //       ((2 * Math.PI * rotateDelta.x) / element.clientWidth) *
    //         scope.rotateSpeed
    //     );

    //     // rotating up and down along whole screen attempts to go 360, but limited to 180
    //     scope.rotateUp(
    //       ((2 * Math.PI * rotateDelta.y) / element.clientHeight) *
    //         scope.rotateSpeed
    //     );

    //     rotateStart.copy(rotateEnd);
    //   } else if (state === STATE.DOLLY) {
    //     if (scope.noZoom === true) return;

    //     dollyEnd.set(event.clientX, event.clientY);
    //     dollyDelta.subVectors(dollyEnd, dollyStart);

    //     if (dollyDelta.y > 0) {
    //       scope.dollyIn();
    //     } else if (dollyDelta.y < 0) {
    //       scope.dollyOut();
    //     }

    //     dollyStart.copy(dollyEnd);
    //   } else if (state === STATE.PAN) {
    //     if (scope.noPan === true) return;

    //     panEnd.set(event.clientX, event.clientY);
    //     panDelta.subVectors(panEnd, panStart);

    //     scope.pan(panDelta.x, panDelta.y);

    //     panStart.copy(panEnd);
    //   }

    //   if (state !== STATE.NONE) scope.update();
    // }

    // function onMouseUp(/* event */) {
    //   if (scope.enabled === false) return;

    //   document.removeEventListener("mousemove", onMouseMove, false);
    //   document.removeEventListener("mouseup", onMouseUp, false);
    //   scope.dispatchEvent(endEvent);
    //   state = STATE.NONE;
    // }

    // function onMouseWheel(event) {
    //   if (
    //     scope.enabled === false ||
    //     scope.noZoom === true ||
    //     state !== STATE.NONE
    //   )
    //     return;

    //   event.preventDefault();
    //   event.stopPropagation();

    //   var delta = 0;

    //   if (event.wheelDelta !== undefined) {
    //     // WebKit / Opera / Explorer 9

    //     delta = event.wheelDelta;
    //   } else if (event.detail !== undefined) {
    //     // Firefox

    //     delta = -event.detail;
    //   }

    //   if (delta > 0) {
    //     scope.dollyOut();
    //   } else if (delta < 0) {
    //     scope.dollyIn();
    //   }

    //   scope.update();
    //   scope.dispatchEvent(startEvent);
    //   scope.dispatchEvent(endEvent);
    // }

    // function onKeyDown(event) {
    //   if (
    //     scope.enabled === false ||
    //     scope.noKeys === true ||
    //     scope.noPan === true
    //   )
    //     return;

    //   switch (event.keyCode) {
    //     case scope.keys.UP:
    //       scope.pan(0, scope.keyPanSpeed);
    //       scope.update();
    //       break;

    //     case scope.keys.BOTTOM:
    //       scope.pan(0, -scope.keyPanSpeed);
    //       scope.update();
    //       break;

    //     case scope.keys.LEFT:
    //       scope.pan(scope.keyPanSpeed, 0);
    //       scope.update();
    //       break;

    //     case scope.keys.RIGHT:
    //       scope.pan(-scope.keyPanSpeed, 0);
    //       scope.update();
    //       break;
    //   }
    // }

    // function touchstart(event) {
    //   if (scope.enabled === false) return;

    //   switch (event.touches.length) {
    //     case 1: // one-fingered touch: rotate
    //       if (scope.noRotate === true) return;

    //       state = STATE.TOUCH_ROTATE;

    //       rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
    //       break;

    //     case 2: // two-fingered touch: dolly
    //       if (scope.noZoom === true) return;

    //       state = STATE.TOUCH_DOLLY;

    //       var dx = event.touches[0].pageX - event.touches[1].pageX;
    //       var dy = event.touches[0].pageY - event.touches[1].pageY;
    //       var distance = Math.sqrt(dx * dx + dy * dy);
    //       dollyStart.set(0, distance);
    //       break;

    //     case 3: // three-fingered touch: pan
    //       if (scope.noPan === true) return;

    //       state = STATE.TOUCH_PAN;

    //       panStart.set(event.touches[0].pageX, event.touches[0].pageY);
    //       break;

    //     default:
    //       state = STATE.NONE;
    //   }

    //   if (state !== STATE.NONE) scope.dispatchEvent(startEvent);
    // }

    // function touchmove(event) {
    //   if (scope.enabled === false) return;

    //   event.preventDefault();
    //   event.stopPropagation();

    //   var element =
    //     scope.domElement === document ? scope.domElement.body : scope.domElement;

    //   switch (event.touches.length) {
    //     case 1: // one-fingered touch: rotate
    //       if (scope.noRotate === true) return;
    //       if (state !== STATE.TOUCH_ROTATE) return;

    //       rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
    //       rotateDelta.subVectors(rotateEnd, rotateStart);

    //       // rotating across whole screen goes 360 degrees around
    //       scope.rotateLeft(
    //         ((2 * Math.PI * rotateDelta.x) / element.clientWidth) *
    //           scope.rotateSpeed
    //       );
    //       // rotating up and down along whole screen attempts to go 360, but limited to 180
    //       scope.rotateUp(
    //         ((2 * Math.PI * rotateDelta.y) / element.clientHeight) *
    //           scope.rotateSpeed
    //       );

    //       rotateStart.copy(rotateEnd);

    //       scope.update();
    //       break;

    //     case 2: // two-fingered touch: dolly
    //       if (scope.noZoom === true) return;
    //       if (state !== STATE.TOUCH_DOLLY) return;

    //       var dx = event.touches[0].pageX - event.touches[1].pageX;
    //       var dy = event.touches[0].pageY - event.touches[1].pageY;
    //       var distance = Math.sqrt(dx * dx + dy * dy);

    //       dollyEnd.set(0, distance);
    //       dollyDelta.subVectors(dollyEnd, dollyStart);

    //       if (dollyDelta.y > 0) {
    //         scope.dollyOut();
    //       } else if (dollyDelta.y < 0) {
    //         scope.dollyIn();
    //       }

    //       dollyStart.copy(dollyEnd);

    //       scope.update();
    //       break;

    //     case 3: // three-fingered touch: pan
    //       if (scope.noPan === true) return;
    //       if (state !== STATE.TOUCH_PAN) return;

    //       panEnd.set(event.touches[0].pageX, event.touches[0].pageY);
    //       panDelta.subVectors(panEnd, panStart);

    //       scope.pan(panDelta.x, panDelta.y);

    //       panStart.copy(panEnd);

    //       scope.update();
    //       break;

    //     default:
    //       state = STATE.NONE;
    //   }
    // }

    // function touchend(/* event */) {
    //   if (scope.enabled === false) return;

    //   scope.dispatchEvent(endEvent);
    //   state = STATE.NONE;
    // }

    /**
     * Tilt function
     *
     * For mobile, uses orientation sensors to orbit target object. Only supports
     * orbit.  Pan and zoom may come later.  Ping me if of interest sean @ novak.us
     *
     * @param event
     *
     * @Performance: I have found that devicemotion event is a little faster
     * likely because the delta is part of the device event object and doesn't
     * have to be calculated here.  Though, I find that the deviceorientation
     * event is more common.
     */
    function tilt(event) {
      if (scope.enabled === false) return;
      switch (event.type) {
        case "deviceorientation":
          rotateEnd.set(event.gamma, event.beta);
          rotateDelta.subVectors(rotateEnd, rotateStart);

          scope.rotateLeft(rotateDelta.x * scope.tiltSpeed);
          scope.rotateUp(rotateDelta.y * scope.tiltSpeed);

          rotateStart.copy(rotateEnd);

          scope.update();

          break;
        case "devicemotion":
          scope.rotateLeft(event.rotationRate.beta * scope.tiltSpeed);
          scope.rotateUp(event.rotationRate.alpha * scope.tiltSpeed);

          scope.update();

          break;
      }
    } //tilt

    // this.domElement.addEventListener(
    //   "contextmenu",
    //   function (event) {
    //     event.preventDefault();
    //   },
    //   false
    // );
    // this.domElement.addEventListener("mousedown", onMouseDown, false);
    // this.domElement.addEventListener("mousewheel", onMouseWheel, false);
    // this.domElement.addEventListener("DOMMouseScroll", onMouseWheel, false); // firefox

    // this.domElement.addEventListener("touchstart", touchstart, false);
    // this.domElement.addEventListener("touchend", touchend, false);
    // this.domElement.addEventListener("touchmove", touchmove, false);

    // window.addEventListener("keydown", onKeyDown, false);
    this.connect = (): void => {
      if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", tilt, false);
      } else if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", tilt, false);
      }
    };

    this.dispose = (): void => {
      this.enabled = false;
      scope.enabled = false;
      if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", tilt, false);
      } else if (window.DeviceMotionEvent) {
        window.removeEventListener("devicemotion", tilt, false);
      }
    };

    // force an update at start
    this.update();
  }
}

// OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);
// OrbitControls.prototype.constructor = THREEOrbitControls;

export type OrbitControlsProps = ReactThreeFiber.Overwrite<
  ReactThreeFiber.Object3DNode<OrbitControlsImpl, typeof OrbitControlsImpl>,
  {
    target?: ReactThreeFiber.Vector3;
    camera?: THREE.Camera;
    regress?: boolean;
    enableDamping?: boolean;
  }
>;

/** rotates the scene around the center with device orientation */
export const DeviceOrientationOrbitControls = React.forwardRef<
  OrbitControlsImpl,
  OrbitControlsProps
>(({ camera, regress, enableDamping = true, ...restProps }, ref) => {
  const invalidate = useThree(({ invalidate }) => invalidate);
  const defaultCamera = useThree(({ camera }) => camera);
  const gl = useThree(({ gl }) => gl);
  const performance = useThree(({ performance }) => performance);
  const explCamera = camera || defaultCamera;
  const controls = React.useMemo(
    () => new OrbitControls(explCamera),
    [explCamera]
  );

  useFrame(() => controls.update());

  React.useEffect(() => {
    const callback = () => {
      invalidate();
      if (regress) performance.regress();
    };

    controls.connect(gl.domElement);
    (controls as any).addEventListener("change", callback);
    if (window.DeviceOrientationEvent) {
      window.removeEventListener("deviceorientation", blockEvents, true);
    } else if (window.DeviceMotionEvent) {
      window.removeEventListener("devicemotion", blockEvents, true);
    }
    return () => {
      controls.dispose();
      (controls as any).removeEventListener("change", callback);
      if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", blockEvents, true);
      } else if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", blockEvents, true);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regress, controls, invalidate]);

  return (
    <primitive
      ref={ref}
      object={controls}
      enableDamping={enableDamping}
      {...restProps}
    />
  );
});

function blockEvents(event) {
  event.stopImmediatePropagation();
}
