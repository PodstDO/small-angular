/* global smallAngular */

smallAngular.directive('ng-init', function(scope, el) {
  const data = el.getAttribute('ng-init');
  scope.eval(data);
});

smallAngular.directive('ng-repeat', function(scope, el) {
  const data = el.getAttribute('ng-repeat');
  const collectionName = data.split(' ')[2];
  const parent = el.parentElement;

  const repeatFunc = () => {
    const value = scope[collectionName];
    const similarEls = document.querySelectorAll(`[ng-repeat="${data}"]`);

    for (const item of value) {
      const clonedEl = el.cloneNode();
      clonedEl.innerText = item;
      parent.appendChild(clonedEl);
    }

    similarEls.forEach(el => el.remove());
  };

  repeatFunc();

  scope.$watch(() => collectionName, repeatFunc);
});

smallAngular.directive('ng-show', function(scope, el) {
  const attrValue = el.getAttribute('ng-show');
  el.style.display = eval(attrValue) ? 'block' : 'none';

  scope.$watch(() => attrValue, () => {
    el.style.display = eval(attrValue) ? 'block' : 'none';
  });
});

smallAngular.directive('ng-hide', function(scope, el) {
  const attrValue = el.getAttribute('ng-hide');
  el.style.display = eval(attrValue) ? 'none' : 'block';

  scope.$watch(eval(attrValue), () => {
    el.style.display = eval(attrValue) ? 'none' : 'block';
  });
});

smallAngular.directive('ng-click', function(scope, el) {
  el.addEventListener('click', () => {
    const attrValue = el.getAttribute('ng-click');
    eval(attrValue);
    scope.$apply();
  });
});

smallAngular.directive('ng-model', function(scope, el) {
  const attrValue = el.getAttribute('ng-model');
  el.addEventListener('input', () => {
    eval(`${attrValue} = el.value`);
    scope.$apply();
  });

  scope.$watch(() => attrValue, () => {
    el.value = eval(attrValue);
  });
});

smallAngular.directive('ng-bind', function(scope, el) {
  const data = el.getAttribute('ng-bind');

  if (data in scope) {
    el.innerText = eval(data);
    scope.$watch(() => data, () => {
      el.innerText = eval(data);
    });
  }
});