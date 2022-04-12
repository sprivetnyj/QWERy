//================================================================================

// data-tooltip="id" - для родителя всех спойлеров
//  @id - id тултипа, с которым будут связаны aria-атрибуты

// .active - для активного тултипа

function tooltip() {
	const tooltipsArray = document.querySelectorAll('[data-tooltip]');
	if (tooltipsArray.length) {
		tooltipsArray.forEach(tooltipInit);
		function tooltipInit(tooltipTrigger) {
			const tooltipId = tooltipTrigger.dataset.tooltip;
			const tooltipBody = tooltipTrigger.querySelector('.tooltip__body');
			tooltipTrigger.setAttribute('aria-labeledby', tooltipId);
			tooltipBody.setAttribute('id', tooltipId);
			tooltipEvents(tooltipTrigger, tooltipBody)
		}
		function tooltipEvents(tooltipTrigger, tooltipBody) {
			tooltipTrigger.addEventListener('mouseenter', () => { showTooltip(tooltipBody); });
			tooltipTrigger.addEventListener('focus', () => { showTooltip(tooltipBody); });
			tooltipTrigger.addEventListener('mouseleave', () => { showTooltip(tooltipBody); });
			tooltipTrigger.addEventListener('blur', () => { showTooltip(tooltipBody); });
		}
		function showTooltip(tooltipBody) {
			tooltipBody.classList.toggle('active');
		}
	}
}
tooltip();

//================================================================================