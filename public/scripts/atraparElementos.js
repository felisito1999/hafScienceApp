
/*Crear otra funcion para dividir la alerte de seleccion de elemento de las demas. */


var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d") ;
canvas.width = 700;
canvas.height = 600;
document.body.appendChild(canvas);

var monstersCaught = 0;
var valorpositivosodium=0;
var valorpositivotitaium=0;
var valorpositivoboro=0;
var bgImage = new Image();
var heroImage = new Image();
var vartempo=0;

var monsterImage = new Image();
var monsterImage2 = new Image();
var monsterImage3 = new Image();
var monsterImage4 = new Image();
var monsterImage5 = new Image();
var monsterImage6 = new Image();
var monsterImage7 = new Image();
var monsterImage8 = new Image();
var monsterImage9 = new Image();
var monsterImage10 = new Image();


var totalTime = 0;
var puntosjuegosacumuldos=0;

let parrafoh4=document.querySelector('h4');
let parrafo=document.querySelector('h2')
let ganadoroperdedor=document.querySelector('p');
let seleccion=document.querySelector('select');
seleccion.addEventListener('change',seleccionarelemento);
let seleccionelemento=document.querySelector('h1');

	

function seleccionarelemento()
{
	let eleccion =seleccion.value;
	console.log(eleccion)


	if(eleccion=='op1')
	{ 

		
		
		
		ctx.clearRect(0,0,700,600)
		parrafoh4.textContent="Tiene 60 segundo para elegir los elementos: Sodio, Titanio y Escandio ";
		totalTime=60;
		vartempo=0;
		monstersCaught = 0;
		console.log(vartempo)

		mostraocultar();
		updateClock();
		oclutarcuadroresultado();
		
		valorpositivotitaium=0;
		valorpositivosc=0;
		valorpositivosodium=0;
		puntosjuegosacumuldos=0;
		parrafo.textContent=""
		seleccionelemento.textContent="";
		console.log("entre op1"+puntosjuegosacumuldos+valorpositivosodium+valorpositivotitaium+monstersCaught+vartempo+totalTime)

	
					
	
	

	

	


							
							// Background image
							var bgReady = false;
							
							bgImage.onload = function () {
								bgReady = true;
							};
							bgImage.src = "https://drunkenzebrastudio.files.wordpress.com/2011/12/topwall.png";

							// Hero image
							var heroReady = false;
							
							heroImage.onload = function () {
								heroReady = true;
							};
							heroImage.src = "https://raw.githubusercontent.com/lostdecade/simple_canvas_game/master/images/hero.png";

							// Monster image
							var monsterReady = false;
							var monsterReady2 = false
							var monsterReady3 = false
							var monsterReady4 = false
						

							







							monsterImage.onload = function () {
								monsterReady = true;
								monsterReady2 = true;
								monsterReady3 = true;
								monsterReady4 = true;
								
							};

							monsterImage.src = "imgs/sodium.png" ;
							monsterImage2.src = "imgs/titanium.png" ;						
							monsterImage4.src = "imgs/potassium.png" ;
							monsterImage5.src="imgs/lithium.png";
							monsterImage6.src="imgs/magnesium.png";
							monsterImage7.src="imgs/calcium.png";
							monsterImage8.src="imgs/be.png";
							monsterImage9.src="imgs/sc.png";

							// Game objects
							var hero = {
								speed: 256 // movement in pixels per second
							};
							var monster = {};
							var monsterposi = {};
							//var posi = {};
							var posi4 = {};
							var posi5={};
							var posi6={};
							var posi7={};
							var posi8={};
							var posi9={};


							

							// Handle keyboard controls
							var keysDown = {};

							addEventListener("keydown", function (e) {
								keysDown[e.keyCode] = true;
							}, false);

							addEventListener("keyup", function (e) {
								delete keysDown[e.keyCode];
							}, false);

							// Reset the game when the player catches a monster
							hero.x = canvas.width / 2;
							hero.y = canvas.height / 2;
							
									var  reset = function () {
								
										// Throw the monster somewhere on the screen randomly
										monster.x = 32 + (Math.random() * (canvas.width - 64));
										monster.y = 32 + (Math.random() * (canvas.height - 64));
										
										monsterposi.x = 35 + (Math.random() * (canvas.width - 64));
										monsterposi.y = 35 + (Math.random() * (canvas.height - 64));
										
										posi4.x = 33 + (Math.random() * (canvas.width - 64));
										posi4.y = 33 + (Math.random() * (canvas.height - 64));
		
										posi5.x = 36 + (Math.random() * (canvas.width - 64));
										posi5.y = 36 + (Math.random() * (canvas.height - 64));
		
										posi6.x = 37 + (Math.random() * (canvas.width - 64));
										posi6.y = 37 + (Math.random() * (canvas.height - 64));
										
										posi7.x = 38 + (Math.random() * (canvas.width - 64));
										posi7.y = 38 + (Math.random() * (canvas.height - 64));
		
										posi8.x = 31 + (Math.random() * (canvas.width - 64));
										posi8.y = 31 + (Math.random() * (canvas.height - 64));
		
										posi9.x = 39 + (Math.random() * (canvas.width - 64));
										posi9.y = 39 + (Math.random() * (canvas.height - 64));
									};
		
								
							
									let btnarriba=document.querySelector('#holas23');
									let btnabajo=document.querySelector('#holas24');
									let btnderecha=document.querySelector('#holas25');
									let btnizquierda=document.querySelector('#holas26');
									

							// Update game objects
							var update = function (modifier) {
								if (38 in keysDown) { // Player holding up
									
									hero.y -= hero.speed * modifier;
									seleccionelemento.textContent="";
								}
								
								btnarriba.addEventListener('click', function()
								 { 
									hero.y -= hero.speed * 0.0001;
									seleccionelemento.textContent="";
								});

								btnabajo.addEventListener('click', function()
								 { 
									hero.y += hero.speed * 0.0001;
									seleccionelemento.textContent="";
								});

								btnizquierda.addEventListener('click', function()
								 { 
									hero.x -= hero.speed * 0.0001;
									seleccionelemento.textContent="";
								});

								btnderecha.addEventListener('click', function()
								 { 
									hero.x += hero.speed * 0.0001;
									seleccionelemento.textContent="";
								});
								
								
								if (40 in keysDown) { // Player holding down
									hero.y += hero.speed * modifier;
									seleccionelemento.textContent="";

								}
								if (37 in keysDown) { // Player holding left
									hero.x -= hero.speed * modifier;
									seleccionelemento.textContent="";

								}
								if (39 in keysDown) { // Player holding right
									hero.x += hero.speed * modifier;
									seleccionelemento.textContent="";
									
								}
								

								
								//Verificar con quien esta chocando el elemento
								colision();
								
								
							};


							// Draw everything
							var render = function () {
								if (bgReady) {
									ctx.drawImage(bgImage, 0, 0);
								}

								if (heroReady) {
									ctx.drawImage(heroImage, hero.x, hero.y);
								}


								if (monsterReady) {
								//titanium	
								ctx.drawImage(monsterImage2, monsterposi.x, monsterposi.y);	
								//sodium
								ctx.drawImage(monsterImage, monster.x, monster.y);

								//potasio	
								ctx.drawImage(monsterImage4, posi4.x, posi4.y);


								//litio
								ctx.drawImage(monsterImage5, posi5.x, posi5.y);	

								//magnesium
								ctx.drawImage(monsterImage6, posi6.x, posi6.y);
								
								//calcium
								ctx.drawImage(monsterImage7, posi7.x, posi7.y);	

								//berilio
								ctx.drawImage(monsterImage8, posi8.x, posi8.y);	

								//escandio
								ctx.drawImage(monsterImage9, posi9.x, posi9.y);	
								}
								

								// Score
								ctx.fillStyle = "rgb(250, 250, 250)";
								ctx.font = "24px Helvetica";
								ctx.textAlign = "left";
								ctx.textBaseline = "top";
								ctx.fillText("Elementos atrapados (Puntos): " + monstersCaught, 32, 32);
								
									
								

								
							};



							// The main game loop
							var main = function () {
								var now = Date.now();
								var delta = now - then;

								update(delta / 1000);
								render();

								then = now;

								// Request to do this again ASAP
								requestAnimationFrame(main);
							};

							// Cross-browser support for requestAnimationFrame
							var w = window;
							requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

							// Let's play this game!
							var then = Date.now();
							reset();
							main();



							function colision()
							{

								//sodium
								if (hero.x <= (monster.x + 32)&& monster.x <= (hero.x + 32)
								&& hero.y <= (monster.y + 32)&& monster.y <= (hero.y + 32)) 
								{
									if(valorpositivosodium==0)
									{
									++monstersCaught;
									valorpositivosodium=1;
									puntosjuegosacumuldos=puntosjuegosacumuldos+1;
									console.log("sidum paso");
									
									reset();

									}
									else
									{
										/*
										mostrarcuadroresultado()
										ganadoroperdedor.textContent="Ya seleccionaste este elemento";
										*/
										seleccionelemento.textContent="Ya seleccionaste este elemento"
										
									}

									
									
								}

								//potasio	
								else
								if(hero.x <= (posi4.x + 33)&& posi4.x <= (hero.x + 33)
									&& hero.y <= (posi4.y + 33)&& posi4.y <= (hero.y + 33))
										{
											
											--monstersCaught;
											reset();

											
										}	
								else
								
							
								//titanium
								if(hero.x <= (monsterposi.x + 35)&& monsterposi.x <= (hero.x + 35)
								&& hero.y <= (monsterposi.y + 35)&& monsterposi.y <= (hero.y + 35))
								{
									if(valorpositivotitaium==0)
									{
									
									++monstersCaught;
									puntosjuegosacumuldos=puntosjuegosacumuldos+1;
									valorpositivotitaium=1;
									reset();
									console.log("titanium paso");
									}
									else
									{
									/*	mostrarcuadroresultado()
										ganadoroperdedor.textContent="Ya seleccionaste este elemento";	
										*/
										seleccionelemento.textContent="Ya seleccionaste este elemento"
									}
									
									

								}
								else
									//litio
								if(hero.x <= (posi5.x + 36)&& posi5.x <= (hero.x + 36)
								&& hero.y <= (posi5.y + 36)&& posi5.y <= (hero.y + 36))
								{
									
									--monstersCaught;
									totalTime=totalTime-10;
									reset();
								}
								else
								//magnesium
								
								if(hero.x <= (posi6.x + 37)&& posi6.x <= (hero.x + 37)
								&& hero.y <= (posi6.y + 37)&& posi6.y <= (hero.y + 37))
								{
									
									--monstersCaught;
									totalTime=totalTime-10;
									reset();
								}
								else
								//calcium
								if(hero.x <= (posi7.x + 38)&& posi7.x <= (hero.x + 38)
								&& hero.y <= (posi7.y + 38)&& posi7.y <= (hero.y + 38))
								{
									--monstersCaught;
									totalTime=totalTime-10;
									reset();
								}
								else
								//berilio
								if(hero.x <= (posi8.x + 31)&& posi8.x <= (hero.x + 31)
								&& hero.y <= (posi8.y + 31)&& posi8.y <= (hero.y + 31))
								{
									--monstersCaught;
									totalTime=totalTime-10;
									reset();
								}

								//agregar escandio
								if(hero.x <= (posi9.x + 39)&& posi9.x <= (hero.x + 39)
								&& hero.y <= (posi9.y + 39)&& posi9.y <= (hero.y + 39))
								{

									if(valorpositivosc==0)
									{
									
									++monstersCaught;
									puntosjuegosacumuldos=puntosjuegosacumuldos+1;
									valorpositivosc=1;
									reset();
									console.log("escadio paso");
									}
									else
									{
										/*mostrarcuadroresultado()
										ganadoroperdedor.textContent="Ya seleccionaste este elemento";	
										*/
										seleccionelemento.textContent="Ya seleccionaste este elemento"
									}
									
								}
							}
	

	}

	else if (eleccion=='op2')
	{
		
		
		ctx.clearRect(0,0,700,600)
		parrafoh4.textContent="Tiene 40 segundos para elegir los elementos de los grupo 'No metales Poliatomico y Metaloide' ";
		totalTime=40;
		vartempo=0;
		monstersCaught = 0;
		console.log(vartempo)

		mostraocultar();
		updateClock();
		oclutarcuadroresultado();
		
		valorpositivotitaium=0;
		valorpositivosodium=0;
		valorpositivoboro=0;
		puntosjuegosacumuldos=0;
		parrafo.textContent="";
		seleccionelemento.textContent="";
		
		console.log("entre op1"+puntosjuegosacumuldos+valorpositivosodium+valorpositivotitaium+monstersCaught+vartempo+totalTime)


		// Background image
		var bgReady = false;
							
		bgImage.onload = function () {
			bgReady = true;
		};
		bgImage.src = "https://drunkenzebrastudio.files.wordpress.com/2011/12/topwall.png";

		// Hero image
		var heroReady = false;
		
		heroImage.onload = function () {
			heroReady = true;
		};
		heroImage.src = "https://raw.githubusercontent.com/lostdecade/simple_canvas_game/master/images/hero.png";

		// Monster image
		var monsterReady = false;
		var monsterReady2 = false
		var monsterReady3 = false
		var monsterReady4 = false
	

		







		monsterImage.onload = function () {
			monsterReady = true;
			monsterReady2 = true;
			monsterReady3 = true;
			monsterReady4 = true;
			
		};

		//
		monsterImage.src = "imgs/lithium.png" ;
		monsterImage2.src = "imgs/potassium.png" ;
		monsterImage7.src="imgs/calcium.png";
		monsterImage8.src="imgs/be.png";
		monsterImage6.src="imgs/magnesium.png";

		
		//No metales Poliatomico
		monsterImage4.src = "imgs/carbon.png" ;
		monsterImage5.src="imgs/hydrogen.png";

		

		//metaloide
		monsterImage9.src="imgs/boro.png";

		// Game objects
		var hero = {
			speed: 256 // movement in pixels per second
		};
		var monster = {};
		var monsterposi = {};
		//var posi = {};
		var posi4 = {};
		var posi5={};
		var posi6={};
		var posi7={};
		var posi8={};
		var posi9={};


		

		// Handle keyboard controls
		var keysDown = {};

		addEventListener("keydown", function (e) {
			keysDown[e.keyCode] = true;
		}, false);

		addEventListener("keyup", function (e) {
			delete keysDown[e.keyCode];
		}, false);

		// Reset the game when the player catches a monster
		hero.x = canvas.width / 2;
		hero.y = canvas.height / 2;
		
				var  reset = function () {
			
					// Throw the monster somewhere on the screen randomly
					monster.x = 32 + (Math.random() * (canvas.width - 64));
					monster.y = 32 + (Math.random() * (canvas.height - 64));
					
					monsterposi.x = 35 + (Math.random() * (canvas.width - 64));
					monsterposi.y = 35 + (Math.random() * (canvas.height - 64));
					
					posi4.x = 33 + (Math.random() * (canvas.width - 64));
					posi4.y = 33 + (Math.random() * (canvas.height - 64));

					posi5.x = 36 + (Math.random() * (canvas.width - 64));
					posi5.y = 36 + (Math.random() * (canvas.height - 64));

					posi6.x = 37 + (Math.random() * (canvas.width - 64));
					posi6.y = 37 + (Math.random() * (canvas.height - 64));
					
					posi7.x = 38 + (Math.random() * (canvas.width - 64));
					posi7.y = 38 + (Math.random() * (canvas.height - 64));

					posi8.x = 31 + (Math.random() * (canvas.width - 64));
					posi8.y = 31 + (Math.random() * (canvas.height - 64));

					posi9.x = 39 + (Math.random() * (canvas.width - 64));
					posi9.y = 39 + (Math.random() * (canvas.height - 64));
				};

			
		
		
				let btnarriba=document.querySelector('#holas23');
				let btnabajo=document.querySelector('#holas24');
				let btnderecha=document.querySelector('#holas25');
				let btnizquierda=document.querySelector('#holas26');
				

		// Update game objects
		var update = function (modifier) {
			if (38 in keysDown) { // Player holding up
				
				hero.y -= hero.speed * modifier;
				seleccionelemento.textContent="";
			}
			
			btnarriba.addEventListener('click', function()
			 { 
				hero.y -= hero.speed * 0.0001;
				seleccionelemento.textContent="";
			});

			btnabajo.addEventListener('click', function()
			 { 
				hero.y += hero.speed * 0.0001;
				seleccionelemento.textContent="";
			});

			btnizquierda.addEventListener('click', function()
			 { 
				hero.x -= hero.speed * 0.0001;
				seleccionelemento.textContent="";
			});

			btnderecha.addEventListener('click', function()
			 { 
				hero.x += hero.speed * 0.0001;
				seleccionelemento.textContent="";
			});
			
			
			if (40 in keysDown) { // Player holding down
				hero.y += hero.speed * modifier;
				seleccionelemento.textContent="";

			}
			if (37 in keysDown) { // Player holding left
				hero.x -= hero.speed * modifier;
				seleccionelemento.textContent="";

			}
			if (39 in keysDown) { // Player holding right
				hero.x += hero.speed * modifier;
				seleccionelemento.textContent="";
				
			}

			
			//Verificar con quien esta chocando el elemento
			colision();
			
			
		};


		// Draw everything
		var render = function () {
			if (bgReady) {
				ctx.drawImage(bgImage, 0, 0);
			}

			if (heroReady) {
				ctx.drawImage(heroImage, hero.x, hero.y);
			}


			if (monsterReady) {
			//titanium	
			ctx.drawImage(monsterImage2, monsterposi.x, monsterposi.y);
				
			//sodium
			ctx.drawImage(monsterImage, monster.x, monster.y);

			//potasio	
			ctx.drawImage(monsterImage4, posi4.x, posi4.y);


			//litio
			ctx.drawImage(monsterImage5, posi5.x, posi5.y);	

			//magnesium
			ctx.drawImage(monsterImage6, posi6.x, posi6.y);
			
			//calcium
			ctx.drawImage(monsterImage7, posi7.x, posi7.y);	

			//berilio
			ctx.drawImage(monsterImage8, posi8.x, posi8.y);	

			//escandio
			ctx.drawImage(monsterImage9, posi9.x, posi9.y);	
			}
			

			// Score
			ctx.fillStyle = "rgb(250, 250, 250)";
			ctx.font = "24px Helvetica";
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			ctx.fillText("Elementos atrapados (Puntos): " + monstersCaught, 32, 32);
			
				
			

			
		};



		// The main game loop
		var main = function () {
			var now = Date.now();
			var delta = now - then;

			update(delta / 1000);
			render();

			then = now;

			// Request to do this again ASAP
			requestAnimationFrame(main);
		};

		// Cross-browser support for requestAnimationFrame
		var w = window;
		requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

		// Let's play this game!
		var then = Date.now();
		reset();
		main();



		function colision()
		{

			//sodium
			if (hero.x <= (monster.x + 32)&& monster.x <= (hero.x + 32)
			&& hero.y <= (monster.y + 32)&& monster.y <= (hero.y + 32)) 
			{
				
				--monstersCaught;
				
				console.log("sidum paso");
				
				reset();

			}
				

				
				
			

			//crbon	
			else
			if(hero.x <= (posi4.x + 33)&& posi4.x <= (hero.x + 33)
				&& hero.y <= (posi4.y + 33)&& posi4.y <= (hero.y + 33))
					{
						if(valorpositivosodium==0)
						{
						++monstersCaught;
						reset();
						valorpositivosodium=1;
						puntosjuegosacumuldos=puntosjuegosacumuldos+1;
						console.log("carbon")
						}
						else
						{/*
							mostrarcuadroresultado()
							ganadoroperdedor.textContent="Ya seleccionaste este elemento";
							*/
							seleccionelemento.textContent="Ya seleccionaste este elemento"
							
							
						}

						
					}	
			else
			
		
			//titanium
			if(hero.x <= (monsterposi.x + 35)&& monsterposi.x <= (hero.x + 35)
			&& hero.y <= (monsterposi.y + 35)&& monsterposi.y <= (hero.y + 35))
			{
			
				
				--monstersCaught;
				
				reset();
				console.log("titanium paso");
				
				
				
				

			}
			else
				//hidrogeno
			if(hero.x <= (posi5.x + 36)&& posi5.x <= (hero.x + 36)
			&& hero.y <= (posi5.y + 36)&& posi5.y <= (hero.y + 36))
			{
				if(valorpositivotitaium==0)
				{
				++monstersCaught;
				puntosjuegosacumuldos=puntosjuegosacumuldos+1;
				valorpositivotitaium=1;
				reset();
				console.log("hidrogeno")
				}
				else
				{
					/*
					mostrarcuadroresultado()
					ganadoroperdedor.textContent="Ya seleccionaste este elemento";	
					*/
					seleccionelemento.textContent="Ya seleccionaste este elemento"
				}

			}
			else
			//magnesium
			
			if(hero.x <= (posi6.x + 37)&& posi6.x <= (hero.x + 37)
			&& hero.y <= (posi6.y + 37)&& posi6.y <= (hero.y + 37))
			{
				
				--monstersCaught;
				totalTime=totalTime-10;
				reset();
			}
			else
			//calcium
			if(hero.x <= (posi7.x + 38)&& posi7.x <= (hero.x + 38)
			&& hero.y <= (posi7.y + 38)&& posi7.y <= (hero.y + 38))
			{
				--monstersCaught;
				totalTime=totalTime-10;
				reset();
			}
			else
			//berilio
			if(hero.x <= (posi8.x + 31)&& posi8.x <= (hero.x + 31)
			&& hero.y <= (posi8.y + 31)&& posi8.y <= (hero.y + 31))
			{
				--monstersCaught;
				totalTime=totalTime-10;
				reset();
			}

			//boro 
			if(hero.x <= (posi9.x + 39)&& posi9.x <= (hero.x + 39)
			&& hero.y <= (posi9.y + 39)&& posi9.y <= (hero.y + 39))
			{
				if(valorpositivoboro==0)
				{
				++monstersCaught;
				puntosjuegosacumuldos=puntosjuegosacumuldos+1;
				valorpositivoboro=1;
				reset();
				console.log("boro")
				}
				else
				{
					/*
					mostrarcuadroresultado()
					ganadoroperdedor.textContent="Ya seleccionaste este elemento";	
					*/
					seleccionelemento.textContent="Ya seleccionaste este elemento"
				}
			}
		}



	}
	else if (eleccion=='op3')
	{

		ctx.clearRect(0,0,700,600)
		parrafoh4.textContent="Tiene 20 segundos para elegir los elementos que masa atómica son '47.867, 44.955910 y 58.6934' ";
		totalTime=20;
		vartempo=0;
		monstersCaught = 0;
		console.log(vartempo)

		mostraocultar();
		updateClock();
		oclutarcuadroresultado();
		
		valorpositivotitaium=0;
		valorpositivoboro=0;
		valorpositivosodium=0;
		puntosjuegosacumuldos=0;
		parrafo.textContent="";
		seleccionelemento.textContent="";
		
		console.log("entre op1"+puntosjuegosacumuldos+valorpositivosodium+valorpositivotitaium+monstersCaught+vartempo+totalTime)


		// Background image
		var bgReady = false;
							
		bgImage.onload = function () {
			bgReady = true;
		};
		bgImage.src = "https://drunkenzebrastudio.files.wordpress.com/2011/12/topwall.png";

		// Hero image
		var heroReady = false;
		
		heroImage.onload = function () {
			heroReady = true;
		};
		heroImage.src = "https://raw.githubusercontent.com/lostdecade/simple_canvas_game/master/images/hero.png";

		// Monster image
		var monsterReady = false;
		var monsterReady2 = false
		var monsterReady3 = false
		var monsterReady4 = false
	

		







		monsterImage.onload = function () {
			monsterReady = true;
			monsterReady2 = true;
			monsterReady3 = true;
			monsterReady4 = true;
			
		};

		//
		monsterImage.src = "imgs/cromo.png" ;
		monsterImage2.src = "imgs/cobre.png" ;
		monsterImage7.src="imgs/mn.png";
		monsterImage8.src="imgs/hierro.png";
		monsterImage6.src="imgs/metal.png";

		
		monsterImage4.src = "imgs/niquel.png" ;
		monsterImage5.src="imgs/sc.png";

		

		monsterImage9.src="imgs/titanium.png";

		
		var hero = {
			speed: 256 // movement in pixels per second
		};
		var monster = {};
		var monsterposi = {};
		//var posi = {};
		var posi4 = {};
		var posi5={};
		var posi6={};
		var posi7={};
		var posi8={};
		var posi9={};


		

		// Handle keyboard controls
		var keysDown = {};

		addEventListener("keydown", function (e) {
			keysDown[e.keyCode] = true;
		}, false);

		addEventListener("keyup", function (e) {
			delete keysDown[e.keyCode];
		}, false);

		// Reset the game when the player catches a monster
		hero.x = canvas.width / 2;
		hero.y = canvas.height / 2;
		
				var  reset = function () {
			
					// Throw the monster somewhere on the screen randomly
					monster.x = 32 + (Math.random() * (canvas.width - 64));
					monster.y = 32 + (Math.random() * (canvas.height - 64));
					
					monsterposi.x = 35 + (Math.random() * (canvas.width - 64));
					monsterposi.y = 35 + (Math.random() * (canvas.height - 64));
					
					posi4.x = 33 + (Math.random() * (canvas.width - 64));
					posi4.y = 33 + (Math.random() * (canvas.height - 64));

					posi5.x = 36 + (Math.random() * (canvas.width - 64));
					posi5.y = 36 + (Math.random() * (canvas.height - 64));

					posi6.x = 37 + (Math.random() * (canvas.width - 64));
					posi6.y = 37 + (Math.random() * (canvas.height - 64));
					
					posi7.x = 38 + (Math.random() * (canvas.width - 64));
					posi7.y = 38 + (Math.random() * (canvas.height - 64));

					posi8.x = 31 + (Math.random() * (canvas.width - 64));
					posi8.y = 31 + (Math.random() * (canvas.height - 64));

					posi9.x = 39 + (Math.random() * (canvas.width - 64));
					posi9.y = 39 + (Math.random() * (canvas.height - 64));
				};

			
				
		
		
				let btnarriba=document.querySelector('#holas23');
				let btnabajo=document.querySelector('#holas24');
				let btnderecha=document.querySelector('#holas25');
				let btnizquierda=document.querySelector('#holas26');
				

		// Update game objects
		var update = function (modifier) {
			if (38 in keysDown) { // Player holding up
				
				hero.y -= hero.speed * modifier;
				seleccionelemento.textContent="";
			}
			
			btnarriba.addEventListener('click', function()
			 { 
				hero.y -= hero.speed * 0.0001;
				seleccionelemento.textContent="";
			});

			btnabajo.addEventListener('click', function()
			 { 
				hero.y += hero.speed * 0.0001;
				seleccionelemento.textContent="";
			});

			btnizquierda.addEventListener('click', function()
			 { 
				hero.x -= hero.speed * 0.0001;
				seleccionelemento.textContent="";
			});

			btnderecha.addEventListener('click', function()
			 { 
				hero.x += hero.speed * 0.0001;
				seleccionelemento.textContent="";
			});
			
			
			if (40 in keysDown) { // Player holding down
				hero.y += hero.speed * modifier;
				seleccionelemento.textContent="";

			}
			if (37 in keysDown) { // Player holding left
				hero.x -= hero.speed * modifier;
				seleccionelemento.textContent="";

			}
			if (39 in keysDown) { // Player holding right
				hero.x += hero.speed * modifier;
				seleccionelemento.textContent="";
				
			}
			
			//Verificar con quien esta chocando el elemento
			colision();
			
			
		};


		// Draw everything
		var render = function () {
			if (bgReady) {
				ctx.drawImage(bgImage, 0, 0);
			}

			if (heroReady) {
				ctx.drawImage(heroImage, hero.x, hero.y);
			}


			if (monsterReady) {
			//titanium	
			ctx.drawImage(monsterImage2, monsterposi.x, monsterposi.y);
				
			//sodium
			ctx.drawImage(monsterImage, monster.x, monster.y);

			//potasio	
			ctx.drawImage(monsterImage4, posi4.x, posi4.y);


			//litio
			ctx.drawImage(monsterImage5, posi5.x, posi5.y);	

			//magnesium
			ctx.drawImage(monsterImage6, posi6.x, posi6.y);
			
			//calcium
			ctx.drawImage(monsterImage7, posi7.x, posi7.y);	

			//berilio
			ctx.drawImage(monsterImage8, posi8.x, posi8.y);	

			//escandio
			ctx.drawImage(monsterImage9, posi9.x, posi9.y);	
			}
			

			// Score
			ctx.fillStyle = "rgb(250, 250, 250)";
			ctx.font = "24px Helvetica";
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			ctx.fillText("Elementos atrapados (Puntos): " + monstersCaught, 32, 32);
			
				
			

			
		};



		// The main game loop
		var main = function () {
			var now = Date.now();
			var delta = now - then;

			update(delta / 1000);
			render();

			then = now;

			// Request to do this again ASAP
			requestAnimationFrame(main);
		};

		// Cross-browser support for requestAnimationFrame
		var w = window;
		requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

		// Let's play this game!
		var then = Date.now();
		reset();
		main();



		function colision()
		{

			//sodium
			if (hero.x <= (monster.x + 32)&& monster.x <= (hero.x + 32)
			&& hero.y <= (monster.y + 32)&& monster.y <= (hero.y + 32)) 
			{
				
				--monstersCaught;
				
				console.log("sidum paso");
				
				reset();

			}
				

				
				
			

			//carbon	
			else
			if(hero.x <= (posi4.x + 33)&& posi4.x <= (hero.x + 33)
				&& hero.y <= (posi4.y + 33)&& posi4.y <= (hero.y + 33))
					{
						if(valorpositivosodium==0)
						{
						++monstersCaught;
						reset();
						valorpositivosodium=1;
						puntosjuegosacumuldos=puntosjuegosacumuldos+1;
						console.log("carbon")
						}
						else
						{
							/*
							mostrarcuadroresultado()
							ganadoroperdedor.textContent="Ya seleccionaste este elemento";
							*/
							seleccionelemento.textContent="Ya seleccionaste este elemento"
							
						}

						
					}	
			else
			
		
			//titanium
			if(hero.x <= (monsterposi.x + 35)&& monsterposi.x <= (hero.x + 35)
			&& hero.y <= (monsterposi.y + 35)&& monsterposi.y <= (hero.y + 35))
			{
			
				
				--monstersCaught;
				
				reset();
				console.log("titanium paso");
				
				
				
				

			}
			else
				//hidrogeno
			if(hero.x <= (posi5.x + 36)&& posi5.x <= (hero.x + 36)
			&& hero.y <= (posi5.y + 36)&& posi5.y <= (hero.y + 36))
			{
				if(valorpositivotitaium==0)
				{
				++monstersCaught;
				puntosjuegosacumuldos=puntosjuegosacumuldos+1;
				valorpositivotitaium=1;
				reset();
				console.log("hidrogeno")
				}
				else
				{
					/*
					mostrarcuadroresultado()
					ganadoroperdedor.textContent="Ya seleccionaste este elemento";	
					*/
					seleccionelemento.textContent="Ya seleccionaste este elemento"
				}

			}
			else
			//magnesium
			
			if(hero.x <= (posi6.x + 37)&& posi6.x <= (hero.x + 37)
			&& hero.y <= (posi6.y + 37)&& posi6.y <= (hero.y + 37))
			{
				
				--monstersCaught;
				totalTime=totalTime-10;
				reset();
			}
			else
			//calcium
			if(hero.x <= (posi7.x + 38)&& posi7.x <= (hero.x + 38)
			&& hero.y <= (posi7.y + 38)&& posi7.y <= (hero.y + 38))
			{
				--monstersCaught;
				totalTime=totalTime-10;
				reset();
			}
			else
			//berilio
			if(hero.x <= (posi8.x + 31)&& posi8.x <= (hero.x + 31)
			&& hero.y <= (posi8.y + 31)&& posi8.y <= (hero.y + 31))
			{
				--monstersCaught;
				totalTime=totalTime-10;
				reset();
			}

			//boro 
			if(hero.x <= (posi9.x + 39)&& posi9.x <= (hero.x + 39)
			&& hero.y <= (posi9.y + 39)&& posi9.y <= (hero.y + 39))
			{
				if(valorpositivoboro==0)
				{
				++monstersCaught;
				puntosjuegosacumuldos=puntosjuegosacumuldos+1;
				valorpositivoboro=1;
				reset();
				console.log("boro")
				}
				else
				{
					/*
					mostrarcuadroresultado()
					ganadoroperdedor.textContent="Ya seleccionaste este elemento";	
					*/
					seleccionelemento.textContent="Ya seleccionaste este elemento"
				}
			}
		}

	}


}










//reloj


function updateClock() {
	
  document.getElementById('countdown').innerHTML = totalTime;

  if(totalTime<1 && puntosjuegosacumuldos<3)
    {
	  console.log("Como te dijo tu ex, se acabo el tiempo")
	  console.log(puntosjuegosacumuldos)
	  monsterImage.src = "png" ;
	  monsterImage2.src = "png" ;						
	  monsterImage4.src = "png" ;
	  monsterImage5.src="png";
	  monsterImage6.src="png";
	  monsterImage7.src="png";
	  monsterImage8.src="png";
	  monsterImage9.src="png";

	
      parrafo.textContent='Se acabó el tiempo. Obtuvo '+ monstersCaught +' '+ 'Puntos';
	

	  mostrarcuadroresultado()
	  mostrar();
	  seleccion.value="0"
	  ganadoroperdedor.textContent="¡¡Casi lo logras!!, puedes lograrlo en el proximo intento. Vamos, animate!";
	  vartempo=1;
	
    }

	if(totalTime<1 && puntosjuegosacumuldos>=3)
    {
	  console.log("se acabo, pero corono")
	  console.log(puntosjuegosacumuldos)
	  monsterImage.src = "png" ;
	  monsterImage2.src = "png" ;						
	  monsterImage4.src = "png" ;
	  monsterImage5.src="png";
	  monsterImage6.src="png";
	  monsterImage7.src="png";
	  monsterImage8.src="png";
	  monsterImage9.src="png";

	
      parrafo.textContent='Se acabó el tiempo. Obtuvo '+ monstersCaught +' '+ 'Puntos';
	

	  mostrarcuadroresultado()
	  mostrar();
	  seleccion.value="0"
	  ganadoroperdedor.textContent="¡¡Exitoo!!, Buena partida campeón!";
	  vartempo=1;
	
    }
  else
  	{
		if(monstersCaught<1 && puntosjuegosacumuldos>=3 )
		{
			console.log("usted corono, pero tambien se jodio")
			console.log(puntosjuegosacumuldos);
			puntosjuegosacumuldos=0;
			monsterImage.src = "png" ;
			monsterImage2.src = "png" ;						
			monsterImage4.src = "png" ;
			monsterImage5.src="png";
			monsterImage6.src="png";
			monsterImage7.src="png";
			monsterImage8.src="png";
			monsterImage9.src="png";
	
		
		
			mostrarcuadroresultado()
			mostrar();
			seleccion.value="0"
			ganadoroperdedor.textContent="¡¡Ohh noo!!, Seleccionaste los elementos correctos. Pero, tu puntuación no es buena. Vamos, intentalo de nuevo";
			vartempo=1;
		
		}
		if(puntosjuegosacumuldos>=3)
		{
			console.log("Tamo tranquilo")
			console.log(puntosjuegosacumuldos);
			puntosjuegosacumuldos=0;
			monsterImage.src = "png" ;
			monsterImage2.src = "png" ;						
			monsterImage4.src = "png" ;
			monsterImage5.src="png";
			monsterImage6.src="png";
			monsterImage7.src="png";
			monsterImage8.src="png";
			monsterImage9.src="png";
	
		
		
			mostrarcuadroresultado()
			mostrar();
			seleccion.value="0"
			ganadoroperdedor.textContent="¡¡Ganaste!!, Estamos orgullosos de tí!";
			vartempo=1;
		
		}
		if(monstersCaught<= -3)
		{
			console.log("Tamo en los -3")
			console.log(puntosjuegosacumuldos);
			puntosjuegosacumuldos=0;
			monsterImage.src = "png" ;
			monsterImage2.src = "png" ;						
			monsterImage4.src = "png" ;
			monsterImage5.src="png";
			monsterImage6.src="png";
			monsterImage7.src="png";
			monsterImage8.src="png";
			monsterImage9.src="png";
	
		
		
			mostrarcuadroresultado()
			mostrar();
			seleccion.value="0"
			ganadoroperdedor.textContent="¡¡Uff!!, Seleccionaste tres elementos incorrecto de manera seguida. Vamos, intentalo de nuevo";
			vartempo=1;
		
		}

		



		if(totalTime>0 && vartempo==0)
		{
			totalTime-=1;
			setTimeout("updateClock()",1000);
		}
	}
	
	 




}









function mostraocultar()
{
	document.getElementById('divselect').style.display = 'none';

}

function mostrar()
{
	document.getElementById('divselect').style.display = 'block';
}


function oclutarcuadroresultado()
{
	document.getElementById('colum1').style.display = 'none';
}

function mostrarcuadroresultado()
{
	document.getElementById('colum1').style.display = 'block';
}


function resettiempo()
{
	
	oclutarcuadroresultado()
	console.log("tiempo 3 sgdos")
}













