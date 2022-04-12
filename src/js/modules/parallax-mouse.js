//================================================================================
const parallaxItems = document.querySelectorAll('[data-prlx]');
if (parallaxItems.length) {
	const parallaxParent = document.querySelector('[data-prlx-parent]');
	paralaxMouse(parallaxItems);
	function paralaxMouse(parallaxItems) {
		parallaxItems.forEach(parallaxItem => {
			const parallaxData = parallaxItem.dataset.prlx.split(',');
			const parallaxX = parallaxData[0];
			const parallaxY = parallaxData[1];
			const parallaxDirX = parallaxData[2];
			const parallaxDirY = parallaxData[3];
			const parallaxSpeed = parallaxData[4];

			let positionX = 0, positionY = 0;
			let coordXpercent = 0, coordYpercent = 0;

			setMouseParallaxStyle();
			mouseMoveParalax();

			function setMouseParallaxStyle() {
				const distX = coordXpercent - positionX;
				const distY = coordYpercent - positionY;
				positionX = positionX + (distX * parallaxSpeed / 1000);
				positionY = positionY + (distY * parallaxSpeed / 1000);
				parallaxItem.style = `transform: translate3d(${parallaxDirX * positionX / (parallaxX / 10)}%,${parallaxDirY * positionY / (parallaxY / 10)}%,0);`;
				requestAnimationFrame(setMouseParallaxStyle);
			}
			function mouseMoveParalax() {
				parallaxParent.addEventListener('mousemove', (e) => {
					const offsetTop = parallaxItem.getBoundingClientRect().top + window.screenY;
					if (offsetTop >= window.scrollY || (offsetTop + parallaxItem.offsetHeight) >= window.scrollY) {
						const parallaxWidth = window.innerWidth;
						const parallaxHeight = window.innerHeight;
						const coordX = e.clientX - parallaxWidth / 2;
						const coordY = e.clientY - parallaxHeight / 2;
						coordXpercent = coordX / parallaxWidth * 100;
						coordYpercent = coordY / parallaxHeight * 100;
					}
				})
			}
		});
	}
}
//================================================================================