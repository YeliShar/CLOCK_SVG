	'use strict';
	window.onload = function() {
		// Находим все элементы;
		let clockBlock = document.querySelector('.clockBlock');
		let clockBlockCircle = document.querySelector('.clockBlockCircle');
		let digitalWatch = document.querySelector('.digitalWatch');
		let digitalWatchText = document.querySelector('.digitalWatchText');
		let circle;
		let circleText;
		let secondHand;
		let minuteHand;
		let hourHand;
		// Объявляем градусы, радиус, угол;
		let radius = 200;
		let radian;
		let angle;
		let circleCenterY;
		let circleCenterX;
		let circlePositionY;
		let circlePositionX;
		let circleTextPositionY;
		let circleTextPositionX;
		// Создаём главный циферблат
		let clockBlockCenterY=clockBlock.clientHeight/2;
		let clockBlockCenterX=clockBlock.clientWidth/2;
		clockBlockCircle.setAttribute('cy', clockBlockCenterY);
		clockBlockCircle.setAttribute('cx', clockBlockCenterX);
		clockBlockCircle.setAttribute('r', radius);
		clockBlockCircle.setAttribute('fill', '#F3EFCA');
		// Формируем циферблат и устанавливаем его положение:
		digitalWatch.setAttribute('stroke', '#DB4B62');
		digitalWatch.setAttribute('stroke-width', '3');
		digitalWatch.setAttribute('fill-opacity', '0');
		digitalWatch.setAttribute('y', clockBlock.clientHeight/4);
		digitalWatch.setAttribute('x', clockBlock.clientWidth/4.5);
		digitalWatch.style.height = clockBlock.clientHeight/6 + 'px';
		digitalWatch.style.width = clockBlock.clientWidth/1.8 + 'px';
		digitalWatchText.setAttribute('y', clockBlock.clientHeight/2.7);
		digitalWatchText.setAttribute('x', clockBlock.clientWidth/3.8);
		digitalWatchText.setAttribute('fill', '#DB4B62');
		// Создаем кружочки с цифрами от 1 до 12;
		for (let i = 12; i > 0; i--) {
		circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		clockBlock.append(circle);
		// Нужный нам градус для кружочков;
		angle = (i) * 30; 
		radian = angle / 180 * Math.PI;
		// Находим середину кружочков и устанавливаем их позицию;
		circle.setAttribute('r', radius/6);
		circleCenterY = clockBlockCenterY - radius/1.2*Math.cos(radian);
		circleCenterX = clockBlockCenterX + radius/1.2*Math.sin(radian);
		circlePositionY = Math.round(circleCenterY)+'px'; 
		circlePositionX = Math.round(circleCenterX) +'px';
		circle.setAttribute('cy', circlePositionY);
		circle.setAttribute('cx', circlePositionX);
		circle.setAttribute('fill', '#DB4B62');
		// Вписываем цифры в кружочки;
		circleText = document.createElementNS('http://www.w3.org/2000/svg', 'text'); 
		clockBlock.appendChild(circleText);
		circleTextPositionY = Math.round(clockBlockCenterY - radius/1.2*Math.cos(radian) + radius/12) +'px'; 
		circleTextPositionX = Math.round(clockBlockCenterX + radius/1.2*Math.sin(radian)) +'px'; 
		circleText.setAttribute('y', circleTextPositionY);
		circleText.setAttribute('x', circleTextPositionX);
		circleText.setAttribute('text-anchor', 'middle');
		circleText.setAttribute('fill', '#C2CFB7');
		circleText.innerHTML = [i];
		}
		// Формируем стрелки и устанавливаем положение на 00:00;
		secondHand = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
		clockBlock.append(secondHand);
		minuteHand = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
		clockBlock.append(minuteHand);
		hourHand = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
		clockBlock.append(hourHand);
		secondHand.setAttribute('rx', 3);
		minuteHand.setAttribute('rx', 6);
		hourHand.setAttribute('rx', 9);
		secondHand.setAttribute('ry', 0.5*radius);
		minuteHand.setAttribute('ry', 0.45*radius);
		hourHand.setAttribute('ry', 0.4*radius);
		secondHand.setAttribute('cx', clockBlockCenterY);
		minuteHand.setAttribute('cx', clockBlockCenterY);
		hourHand.setAttribute('cx', clockBlockCenterY);
		secondHand.setAttribute('cy', clockBlockCenterX-(0.5*radius));
		minuteHand.setAttribute('cy', clockBlockCenterX-(0.45*radius));
		hourHand.setAttribute('cy', clockBlockCenterX-(0.4*radius));
		secondHand.setAttribute('fill', '#B58771');
		minuteHand.setAttribute('fill', '#B58771');
		hourHand.setAttribute('fill', '#B58771');
		function updateClock() {
			let now = new Date(); 
			let nowSeconds = now.getSeconds();
			let nowMinutes = now.getMinutes();
			let nowHours = now.getHours();
			// Устанавливаем "электронные" часы;
			if (nowSeconds < 10){
				nowSeconds = '0' + nowSeconds;
			}
			if (nowMinutes < 10){
				nowMinutes = '0' + nowMinutes;
			}
			if (nowHours < 10){
				nowHours = '0' + nowHours;
			}
			digitalWatchText.innerHTML = nowHours + ':' + nowMinutes + ':' + nowSeconds;
			// Находим градусы для стрелок и указываем их вращение;
			let angleSeconds = nowSeconds * 6;
			let angleMinutes = nowMinutes * 6;
			let angleHours = (nowHours * 30) + (nowMinutes / 2);
			secondHand.style.transformOrigin = '50%';
			minuteHand.style.transformOrigin = '50%';
			hourHand.style.transformOrigin = '50%';
			secondHand.style.transform = 'rotate('+ (angleSeconds) + 'deg)';
			minuteHand.style.transform = 'rotate('+ (angleMinutes) + 'deg)';
			hourHand.style.transform = 'rotate('+ (angleHours) + 'deg)'; 
		}
		setTimeout(updateClock, 0);
		setInterval(updateClock,1000);
	}
