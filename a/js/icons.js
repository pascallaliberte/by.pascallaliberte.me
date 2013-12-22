(function($){
  
  function draw_i_32() {
    var canvas = document.getElementById("i_32");
    var context = canvas.getContext("2d");
    context.fillStyle = "#BB5400";
    context.fillRect(0, 0 , 32, 32);
    
    context.fillStyle = "#ffffff";
    context.font = "normal 20px adelle";
        
    context.fillText("A", 5, 25);
  }
  
  function draw_i_120() {
    var canvas = document.getElementById("i_120");
    var context = canvas.getContext("2d");
    context.fillStyle = "#BB5400";
    context.fillRect(0, 0 , 120, 120);
    
    context.fillStyle = "#ffffff";
    context.font = "normal 28px adelle";
        
    context.fillText("A", 12, 70);
    context.fillText("journal", 12, 100);
  }
  
  function draw_i_152() {
    var canvas = document.getElementById("i_152");
    var context = canvas.getContext("2d");
    context.fillStyle = "#BB5400";
    context.fillRect(0, 0 , 152, 152);
    
    context.fillStyle = "#ffffff";
    context.font = "normal 35.46666666666667px adelle";
        
    context.fillText("A", 15.2, 88.6666666666669);
    context.fillText("journal", 15.2, 126.66666666666667);
  }
  
  function draw_i_76() {
    var canvas = document.getElementById("i_76");
    var context = canvas.getContext("2d");
    context.fillStyle = "#BB5400";
    context.fillRect(0, 0 , 76, 76);
    
    context.fillStyle = "#ffffff";
    context.font = "normal 17.73333333333333px adelle";
        
    context.fillText("A", 7.6, 44.33333333333333);
    context.fillText("journal", 7.6, 63.33333333333333);
  }

  draw_i_32();
  draw_i_120();
  draw_i_152();
  draw_i_76();
  
  
  
})(jQuery);