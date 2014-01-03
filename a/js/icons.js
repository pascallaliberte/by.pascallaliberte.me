(function($){
  
  function draw_favicon(canvas) {
    var context = canvas.getContext("2d");
    context.fillStyle = "#BB5400";
    context.fillRect(0, 0 , 32, 32);
    
    context.fillStyle = "rgba(255, 255, 255, 0.701961)";
    context.font = "normal 20px adelle-sans";
        
    context.fillText("by", 5, 23);
  }
  
  function draw_apple_touch_icon(canvas, size) {
    var base_size = 120;
    var resize_factor = typeof size !== 'undefined' ? (size / base_size) : 1;
    
    var context = canvas.getContext("2d");
    context.fillStyle = "#BB5400";
    context.fillRect(0, 0 , 120 * resize_factor, 120 * resize_factor);
    
    context.fillStyle = "#ffffff";
    context.font = "normal " + (22 * resize_factor) + "px adelle";
        
    context.fillText("Thoughts", 10 * resize_factor, 78 * resize_factor);

    context.fillStyle = "rgba(255, 255, 255, 0.701961)";
    context.font = "normal " + (22 * resize_factor) + "px 'adelle-sans'";
    context.fillText("by Pascal", 10 * resize_factor, 103 * resize_factor);
  }

  draw_favicon(document.getElementById("i_32"));
  draw_apple_touch_icon(document.getElementById("i_120"), 120);
  draw_apple_touch_icon(document.getElementById("i_152"), 152);
  draw_apple_touch_icon(document.getElementById("i_76"), 76);

  $("canvas.icons-i").click(function(){
    var filename = $(this).data("filename");
    this.toBlob(function(blob) {
      saveAs(blob, filename);
    }, "image/png");
  });
  
})(jQuery);