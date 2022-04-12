//================================================================================

function select() {
	const selectArray = document.querySelectorAll('[data-select]');
	if (selectArray.length) {
		selectArray.forEach(selectInit);
		function selectInit(select) {
			const selectNative = select.querySelector('[data-select-native]');
			const selectCustom = select.querySelector('[data-select-custom]');
			const selectTrigger = selectCustom.children[0];
			const selectOptions = selectCustom.children[1];
			const optionsList = Array.from(selectOptions.children);
			const optionsCount = optionsList.length;

			let optionChecked = "";
			let optionHoveredIndex = -1;

			selectTrigger.addEventListener("click", () => {
				const isClosed = !selectCustom.classList.contains("active");
				isClosed ? openSelect() : closeSelect();
			});

			function openSelect() {
				selectCustom.classList.add("active");
				selectCustom.setAttribute("aria-hidden", false);
				if (optionChecked) {
					const optionCheckedIndex = optionsList.findIndex(el => el.getAttribute("data-value") === optionChecked);
					selectHovered(optionCheckedIndex);
				}
				document.addEventListener("click", clickEvent);
				document.addEventListener("keydown", keyboardEvent);
			}

			function closeSelect() {
				selectCustom.classList.remove("active");
				selectCustom.setAttribute("aria-hidden", true);
				selectHovered(-1);
				document.removeEventListener("click", clickEvent);
				document.removeEventListener("keydown", keyboardEvent);
			}

			function selectHovered(newIndex) {
				const prevOption = selectOptions.children[optionHoveredIndex];
				const option = selectOptions.children[newIndex];

				if (prevOption) {
					prevOption.classList.remove("hover");
				}
				if (option) {
					option.classList.add("hover");
				}

				optionHoveredIndex = newIndex;
			}

			function selectChecked(value, text) {
				const valueOld = optionChecked;
				const optionPrev = selectOptions.querySelector(`[data-value="${valueOld}"`);
				const optionNew = selectOptions.querySelector(`[data-value="${value}"`);

				optionPrev ? optionPrev.classList.remove("active") : null;
				optionNew ? optionNew.classList.add("active") : null;

				selectTrigger.textContent = text;
				optionChecked = value;
			}

			function clickEvent(e) {
				!selectCustom.contains(e.target) ? closeSelect() : null;
			}

			function keyboardEvent(e) {
				// Если стрелка вниз и index < max-index
				e.key === 'ArrowDown' && optionHoveredIndex < optionsCount - 1 ?
					selectHovered(optionHoveredIndex + 1) : null;

				// Если стрелка вверх и index > 0
				e.key === 'ArrowUp' && optionHoveredIndex > 0 ?
					selectHovered(optionHoveredIndex - 1) : null;

				e.key === 'End' ? selectHovered(optionsCount - 1) : null;
				e.key === 'Home' ? selectHovered(0) : null;
				e.key === 'Escape' ? closeSelect() : null;

				if ((e.key === 'Space') || (e.key === 'Enter')) {
					const option = selectOptions.children[optionHoveredIndex];
					const value = option && option.getAttribute("data-value");

					if (value) {
						selectNative.value = value;
						selectChecked(value, option.textContent);
					}
					closeSelect();
				}
			}

			selectNative.addEventListener("change", (e) => {
				const value = e.target.value;
				// Выбранный option в нативном select
				const optionNew = selectOptions.querySelector(`[data-value="${value}"]`);
				selectChecked(value, optionNew.textContent);
			});

			optionsList.forEach((optionNew, index) => {
				optionNew.addEventListener("click", (e) => {
					const value = e.target.getAttribute("data-value");
					selectNative.value = value;
					selectChecked(value, e.target.textContent);
					closeSelect();
				});
				// Для отображения при открытия выбранного option
				optionNew.addEventListener("mouseenter", () => { selectHovered(index); });
			});
		}
	}
}
select();
//================================================================================