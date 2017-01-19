/*!
 * jquery.okayNav.js 2.0.2 (https://github.com/VPenkov/okayNav)
 * Author: Vergil Penkov (http://vergilpenkov.com/)
 * MIT license: https://opensource.org/licenses/MIT
 */
!function(n){"function"==typeof define&&define.amd?define(["jquery"],n):"object"==typeof module&&module.exports?module.exports=function(i,e){return void 0===e&&(e="undefined"!=typeof window?require("jquery"):require("jquery")(i)),n(e),e}:n(jQuery)}(function(n){function i(i,e){self=this,this.options=n.extend({},t,e),_options=this.options,$navigation=n(i),$document=n(document),$window=n(window),""==this.options.parent?this.options.parent=$navigation.parent():"",_nav_visible=!1,_nav_full_width=0,_parent_full_width=0,radCoef=180/Math.PI,_sTouch={x:0,y:0},_cTouch={x:0,y:0},_sTime=0,_nav_position=0,_percent_open=0,_nav_moving=!1,self.init()}var e="okayNav",t={parent:"",toggle_icon_class:"okayNav__menu-toggle",toggle_icon_content:"<span /><span /><span />",align_right:!0,swipe_enabled:!0,threshold:50,resize_delay:10,beforeOpen:function(){},afterOpen:function(){},beforeClose:function(){},afterClose:function(){},itemHidden:function(){},itemDisplayed:function(){}};i.prototype={init:function(){n("body").addClass("okayNav-loaded"),$navigation.addClass("okayNav loaded").children("ul").addClass("okayNav__nav--visible"),self.options.align_right?$navigation.append('<ul class="okayNav__nav--invisible transition-enabled nav-right" />').append('<a href="#" class="'+_options.toggle_icon_class+' okay-invisible">'+_options.toggle_icon_content+"</a>"):$navigation.prepend('<ul class="okayNav__nav--invisible transition-enabled nav-left" />').prepend('<a href="#" class="'+_options.toggle_icon_class+' okay-invisible">'+_options.toggle_icon_content+"</a>"),$nav_visible=$navigation.children(".okayNav__nav--visible"),$nav_invisible=$navigation.children(".okayNav__nav--invisible"),$nav_toggle_icon=$navigation.children("."+_options.toggle_icon_class),_toggle_icon_width=$nav_toggle_icon.outerWidth(!0),_nav_default_width=self.getChildrenWidth($navigation),_parent_full_width=n(_options.parent).outerWidth(!0),_last_visible_child_width=0,self.initEvents(),1==_options.swipe_enabled&&self.initSwipeEvents()},initEvents:function(){$document.on("click.okayNav",function(i){var e=n(i.target);_nav_visible===!0&&0==e.closest(".okayNav").length&&self.closeInvisibleNav(),e.hasClass(_options.toggle_icon_class)&&(i.preventDefault(),self.toggleInvisibleNav())});var i=self._debounce(function(){self.recalcNav()},_options.recalc_delay);$window.on("load.okayNav resize.okayNav",i)},initSwipeEvents:function(){$document.on("touchstart.okayNav",function(i){if($nav_invisible.removeClass("transition-enabled"),1==i.originalEvent.touches.length){var e=i.originalEvent.touches[0];(e.pageX<25&&0==self.options.align_right||e.pageX>n(_options.parent).outerWidth(!0)-25&&1==self.options.align_right||_nav_visible===!0)&&(_sTouch.x=_cTouch.x=e.pageX,_sTouch.y=_cTouch.y=e.pageY,_sTime=Date.now())}}).on("touchmove.okayNav",function(n){var i=n.originalEvent.touches[0];self._triggerMove(i.pageX,i.pageY),_nav_moving=!0}).on("touchend.okayNav",function(n){_sTouch={x:0,y:0},_cTouch={x:0,y:0},_sTime=0,_percent_open>100-self.options.threshold?(_nav_position=0,self.closeInvisibleNav()):1==_nav_moving&&(_nav_position=$nav_invisible.width(),self.openInvisibleNav()),_nav_moving=!1,$nav_invisible.addClass("transition-enabled")})},_getDirection:function(n){return self.options.align_right?n>0?-1:1:0>n?-1:1},_triggerMove:function(n,i){_cTouch.x=n,_cTouch.y=i;var e=Date.now(),t=_cTouch.x-_sTouch.x,o=_cTouch.y-_sTouch.y,a=o*o,s=Math.sqrt(t*t+a),l=Math.sqrt(a),_=Math.asin(Math.sin(l/s))*radCoef;s/(e-_sTime);if(_sTouch.x=n,_sTouch.y=i,20>_){var v=self._getDirection(t),c=_nav_position+v*s,r=$nav_invisible.width(),d=0;0>c?d=-c:c>r&&(d=r-c);var p=r-(_nav_position+v*s+d),u=p/r*100;_nav_position+=v*s+d,_percent_open=u,$nav_invisible.css("transform","translateX("+(self.options.align_right?1:-1)*u+"%)")}},getParent:function(){return _options.parent},getVisibleNav:function(){return $nav_visible},getInvisibleNav:function(){return $nav_invisible},getNavToggleIcon:function(){return $nav_toggle_icon},_debounce:function(n,i,e){var t;return function(){var o=this,a=arguments,s=function(){t=null,e||n.apply(o,a)},l=e&&!t;clearTimeout(t),t=setTimeout(s,i),l&&n.apply(o,a)}},openInvisibleNav:function(){_options.enable_swipe?"":_options.beforeOpen.call(),$nav_toggle_icon.addClass("icon--active"),$nav_invisible.addClass("nav-open"),_nav_visible=!0,$nav_invisible.css({"-webkit-transform":"translateX(0%)",transform:"translateX(0%)"}),_options.afterOpen.call()},closeInvisibleNav:function(){_options.enable_swipe?"":_options.beforeClose.call(),$nav_toggle_icon.removeClass("icon--active"),$nav_invisible.removeClass("nav-open"),self.options.align_right?$nav_invisible.css({"-webkit-transform":"translateX(100%)",transform:"translateX(100%)"}):$nav_invisible.css({"-webkit-transform":"translateX(-100%)",transform:"translateX(-100%)"}),_nav_visible=!1,_options.afterClose.call()},toggleInvisibleNav:function(){_nav_visible?self.closeInvisibleNav():self.openInvisibleNav()},getChildrenWidth:function(i){for(var e=0,t=n(i).children(),o=0;o<t.length;o++)e+=n(t[o]).outerWidth(!0);return e},getVisibleItemCount:function(){return n("li",$nav_visible).length},getHiddenItemCount:function(){return n("li",$nav_invisible).length},recalcNav:function(){var i=n(_options.parent).outerWidth(!0),e=self.getChildrenWidth(_options.parent),t=$navigation.outerWidth(!0),o=self.getVisibleItemCount(),a=$nav_visible.outerWidth(!0)+_toggle_icon_width,s=e+_last_visible_child_width+_toggle_icon_width,l=e-t+_nav_default_width;return i>l?(self._expandAllItems(),void $nav_toggle_icon.addClass("okay-invisible")):(o>0&&a>=t&&s>=i&&self._collapseNavItem(),i>s+_toggle_icon_width+15&&self._expandNavItem(),void(0==self.getHiddenItemCount()?$nav_toggle_icon.addClass("okay-invisible"):$nav_toggle_icon.removeClass("okay-invisible")))},_collapseNavItem:function(){var i=n("li:last-child",$nav_visible);_last_visible_child_width=i.outerWidth(!0),$document.trigger("okayNav:collapseItem",i),i.detach().prependTo($nav_invisible),_options.itemHidden.call(),self.recalcNav()},_expandNavItem:function(){var i=n("li:first-child",$nav_invisible);$document.trigger("okayNav:expandItem",i),i.detach().appendTo($nav_visible),_options.itemDisplayed.call()},_expandAllItems:function(){n("li",$nav_invisible).detach().appendTo($nav_visible),_options.itemDisplayed.call()},_collapseAllItems:function(){n("li",$nav_visible).detach().appendTo($nav_invisible),_options.itemHidden.call()},destroy:function(){n("li",$nav_invisible).appendTo($nav_visible),$nav_invisible.remove(),$nav_visible.removeClass("okayNav__nav--visible"),$nav_toggle_icon.remove(),$document.unbind(".okayNav"),$window.unbind(".okayNav")}},n.fn[e]=function(t){var o=arguments;if(void 0===t||"object"==typeof t)return this.each(function(){n.data(this,"plugin_"+e)||n.data(this,"plugin_"+e,new i(this,t))});if("string"==typeof t&&"_"!==t[0]&&"init"!==t){var a;return this.each(function(){var s=n.data(this,"plugin_"+e);s instanceof i&&"function"==typeof s[t]&&(a=s[t].apply(s,Array.prototype.slice.call(o,1))),"destroy"===t&&n.data(this,"plugin_"+e,null)}),void 0!==a?a:this}}});
(function(){
  'use strict';

  // NAVBAR
  var navigation = $('#nav-main').okayNav({
    swipe_enabled: false // If true, you'll be able to swipe left/right to open the navigation
  });

  // BOX SEARCH
  $('#optSearch').click(function() {
    // Close left menu
    navigation.okayNav('closeInvisibleNav');
    // Add/Remove class active
    if ($('.search-box').hasClass('active')) {
      $('.search-box').removeClass('active');
    } else {
      $('.search-box').addClass('active');
    }
    return false;
  });

  $('#optSearchClose').click(function() {
    $('.search-box').removeClass('active');
    return false;
  });

  // YOUTUBE
  // Get Uploads Playlist
  $.get(
     "https://www.googleapis.com/youtube/v3/channels",{
     part : 'contentDetails',
     forUsername : 'TV3Torres',
     key: 'AIzaSyB3N05cqVI-ZzV_PjtkY2Z6m4evuz5EfsM'},
     function(data) {
        $.each( data.items, function( i, item ) {
            var id = item.contentDetails.relatedPlaylists.uploads;
            getVids(id);
        });
    }
  );

  //Get Videos
  function getVids(pid){
      $.get(
          "https://www.googleapis.com/youtube/v3/playlistItems",{
          part : 'snippet',
          maxResults : 6,
          playlistId : pid,
          key: 'AIzaSyB3N05cqVI-ZzV_PjtkY2Z6m4evuz5EfsM'},
          function(data) {
              var results;
              $.each( data.items, function( i, item ) {
                results = '<div class="col-md-2 col-xs-12"><iframe src="http://www.youtube.com/embed/'+item.snippet.resourceId.videoId+'" frameborder="0" allowfullscreen></iframe></div>';
                $('#videosYoutube').append(results);
              });
          }
      );
  }

})();
