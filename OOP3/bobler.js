class Boble {
    constructor(x,y,r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.farge = this.random_farge()
    }
    flytt() {
      this.x = this.x + Math.floor(Math.random() * 10 -5);
      this.y = this.y + Math.floor(Math.random() * 10 -5);
    }
    random_farge() {
        let red = Math.floor(Math.random()*255);
        let green = Math.floor(Math.random()*255);
        let blue = Math.floor(Math.random()*255);
        return "RGB(" + red + "," + green + "," + blue + ")"

    }
    vis() {
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
      ctx.fillStyle = this.farge;
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.stroke();
    }
    inneholder(musx,musy) {
      let a = musx - this.x;
      let b = musy - this.y;
      let d = Math.sqrt(a*a + b*b);

      if (d < this.r) {
        return true;
      } else {
        return false;
      }
    }
    kant_sjekk() {
        if (this.x >= canvas.width || this.y >= canvas.height) {
            this.x -= 20
            this.y -= 20
        }
        else if (this.x <= 0 || this.y <= 0) {
            this.x += 20
            this.y += 20
        }
    }
  }

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.addEventListener("mousedown",musklikk,false);
  canvas.addEventListener("mousemove",musbeveg,false);

  var bobler = [];

  for(let i = 0; i < 10; i++) {
    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.height);
    let r = Math.floor(Math.random() * 40 + 10);
    bobler[i] = new Boble(x,y,r);
  }


  setInterval(tegn,100);
  setInterval(ny_boble, 1000)

  function ny_boble() {
    bobler.push(new Boble(Math.floor(Math.random() * canvas.width),Math.floor(Math.random() * canvas.height),Math.floor(Math.random() * 40 + 10)))
  }

  function tegn() {
    reset();
    for(let i = 0; i < bobler.length; i++) {
      bobler[i].flytt();
      bobler[i].vis();
      bobler[i].kant_sjekk();
    }
    
  }

  function reset() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }

  function musklikk(event) {
    var fikkvalgtenboble = false;

    for(let i = 0; i < bobler.length; i++) {
      if(bobler[i].inneholder(event.x,event.y)) {
        bobler.splice(i,1);
        fikkvalgtenboble = true;
      }
    }

    if(fikkvalgtenboble == false) {
      let r = Math.floor(Math.random() * 40 + 10);
      let b = new Boble(event.x,event.y,r);
      bobler.push(b);
    }
  }

  function musbeveg(event) {
    for(let i = 0; i < bobler.length; i++) {
    if(bobler[i].inneholder(event.x,event.y)) {
        bobler[i].farge = "white";
    } else {
        bobler[i].farge = this.farge;
        }
    }
}