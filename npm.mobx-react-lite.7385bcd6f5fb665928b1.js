(self.webpackChunklife=self.webpackChunklife||[]).push([[507],{"5NJ/":function(e,r,n){"use strict";n.d(r,{Pi:function(){return C}});var t=n("aFzQ"),o=n("q1tI");if(!o.useState)throw new Error("mobx-react-lite requires React with Hooks support");if(!t.rC)throw new Error("mobx-react-lite@3 requires mobx at least version 6 to be available");var i=n("i8i4");var u=[];function a(e){return(0,t.Gf)(e)}function c(e){return{reaction:e,mounted:!1,changedBeforeMount:!1,cleanAt:Date.now()+v}}n="undefined"==typeof FinalizationRegistry?void 0:FinalizationRegistry;var f,l,s,d,y,p,v=1e4,m=(n=n?(s=n,d=new Map,y=1,p=new s((function(e){var r=d.get(e);r&&(r.reaction.dispose(),d.delete(e))})),{addReactionToTrack:function(e,r,n){var t=y++;return p.register(n,t,e),e.current=c(r),e.current.finalizationRegistryCleanupToken=t,d.set(t,e.current),e.current},recordReactionAsCommitted:function(e){p.unregister(e),e.current&&e.current.finalizationRegistryCleanupToken&&d.delete(e.current.finalizationRegistryCleanupToken)},forceCleanupTimerToRunNowForTests:function(){},resetCleanupScheduleForTests:function(){}}):(l=new Set,{addReactionToTrack:function(e,r,n){return e.current=c(r),r=e,l.add(r),b(),e.current},recordReactionAsCommitted:function(e){l.delete(e)},forceCleanupTimerToRunNowForTests:function(){f&&(clearTimeout(f),w())},resetCleanupScheduleForTests:function(){var e,r;if(0<l.size){try{for(var n=function(e){var r="function"==typeof Symbol&&Symbol.iterator,n=r&&e[r],t=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return{value:(e=e&&t>=e.length?void 0:e)&&e[t++],done:!e}}};throw new TypeError(r?"Object is not iterable.":"Symbol.iterator is not defined.")}(l),t=n.next();!t.done;t=n.next()){var o=t.value,i=o.current;i&&(i.reaction.dispose(),o.current=null)}}catch(r){e={error:r}}finally{try{t&&!t.done&&(r=n.return)&&r.call(n)}finally{if(e)throw e.error}}l.clear()}f&&(clearTimeout(f),f=void 0)}})).addReactionToTrack,h=n.recordReactionAsCommitted;function b(){void 0===f&&(f=setTimeout(w,1e4))}function w(){f=void 0;var e=Date.now();l.forEach((function(r){var n=r.current;n&&e>=n.cleanAt&&(n.reaction.dispose(),r.current=null,l.delete(r))})),0<l.size&&b()}function T(e){return"observer"+e}var g=function(){};function R(e,r){void 0===r&&(r="observed");var n,i,c,f=function(e,r){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var t,o,i=n.call(e),u=[];try{for(;(void 0===r||0<r--)&&!(t=i.next()).done;)u.push(t.value)}catch(e){o={error:e}}finally{try{t&&!t.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return u}(o.useState(new g),1)[0],l=(n=function(e,r){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var t,o,i=n.call(e),u=[];try{for(;(void 0===r||0<r--)&&!(t=i.next()).done;)u.push(t.value)}catch(e){o={error:e}}finally{try{t&&!t.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return u}((0,o.useState)(0),2)[1],(0,o.useCallback)((function(){n((function(e){return e+1}))}),u)),s=o.useRef(null);s.current||(i=new t.le(T(r),(function(){c.mounted?l():c.changedBeforeMount=!0})),c=m(s,i,f));var d,y;f=s.current.reaction;if(o.useDebugValue(f,a),o.useEffect((function(){return h(s),s.current?(s.current.mounted=!0,s.current.changedBeforeMount&&(s.current.changedBeforeMount=!1,l())):(s.current={reaction:new t.le(T(r),(function(){l()})),mounted:!0,changedBeforeMount:!1,cleanAt:1/0},l()),function(){s.current.reaction.dispose(),s.current=null}}),[]),f.track((function(){try{d=e()}catch(e){y=e}})),y)throw y;return d}var k=function(){return(k=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var o in r=arguments[n])Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);return e}).apply(this,arguments)};function C(e,r){var n,t,i=k({forwardRef:!1},r),u=e.displayName||e.name;return(r=function(r,n){return R((function(){return e(r,n)}),u)}).displayName=u,r=i.forwardRef?(0,o.memo)((0,o.forwardRef)(r)):(0,o.memo)(r),n=e,t=r,Object.keys(n).forEach((function(e){x[e]||Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})),r.displayName=u,r}var S,x={$$typeof:!0,render:!0,compare:!0,type:!0};S=(S=i.unstable_batchedUpdates)||function(e){e()},(0,t.jQ)({reactionScheduler:S})}}]);