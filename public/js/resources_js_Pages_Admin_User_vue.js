(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Admin_User_vue"],{

/***/ "./node_modules/@vueform/multiselect/dist/multiselect.vue2.js":
/*!********************************************************************!*\
  !*** ./node_modules/@vueform/multiselect/dist/multiselect.vue2.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ __vue_component__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");


function isNullish (val) {
  return [null, undefined].indexOf(val) !== -1
}

function useData (props, context, dep)
{
  const { object, valueProp, mode } = (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRefs)(props);

  const $this = (0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)().proxy;

  // ============ DEPENDENCIES ============

  const iv = dep.iv;

  // =============== METHODS ==============

  const update = (val, triggerInput = true) => {
    // Setting object(s) as internal value
    iv.value = makeInternal(val);

    // Setting object(s) or plain value as external 
    // value based on `option` setting
    const externalVal = makeExternal(val);

    context.emit('change', externalVal, $this);

    if (triggerInput) {
      context.emit('input', externalVal);
      context.emit('update:modelValue', externalVal);
    }
  }; 

  // no export
  const makeExternal = (val) => {
    // If external value should be object
    // no transformation is required
    if (object.value) {
      return val
    }

    // No need to transform if empty value
    if (isNullish(val)) {
      return val
    }

    // If external should be plain transform
    // value object to plain values
    return !Array.isArray(val) ? val[valueProp.value] : val.map(v => v[valueProp.value])
  };

  // no export
  const makeInternal = (val) => {
    if (isNullish(val)) {
      return mode.value === 'single' ? {} : []
    }

    return val
  };

  return {
    update,
  }
}

function useValue (props, context)
{
  const { value, modelValue, mode, valueProp } = (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRefs)(props);

  // ================ DATA ================

  // internalValue
  const iv = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(mode.value !== 'single' ? [] : {});

  // ============== COMPUTED ==============

  /* istanbul ignore next */
  // externalValue
  const ev = modelValue && modelValue.value !== undefined ? modelValue : value;

  const plainValue = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return mode.value === 'single' ? iv.value[valueProp.value] : iv.value.map(v=>v[valueProp.value])
  });

  const textValue = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return mode.value !== 'single' ? iv.value.map(v=>v[valueProp.value]).join(',') : iv.value[valueProp.value]
  });

  return {
    iv,
    internalValue: iv,
    ev,
    externalValue: ev,
    textValue,
    plainValue,
  }
}

function useSearch (props, context, dep)
{
  const { regex } = (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRefs)(props);

  const $this = (0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)().proxy;

  // ============ DEPENDENCIES ============

  const isOpen = dep.isOpen;
  const open = dep.open;

  // ================ DATA ================

  const search = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);

  const input = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);

  // =============== METHODS ==============

  const clearSearch = () => {
    search.value = '';
  };

  const handleSearchInput = (e) => {
    search.value = e.target.value;
  };

  const handleKeypress = (e) => {
    if (regex && regex.value) {
      let regexp = regex.value;

      if (typeof regexp === 'string') {
        regexp = new RegExp(regexp);
      }

      if (!e.key.match(regexp)) {
        e.preventDefault();
      }
    }
  };

  const handlePaste = (e) => {
    if (regex && regex.value) {
      let clipboardData = e.clipboardData || /* istanbul ignore next */ window.clipboardData;
      let pastedData = clipboardData.getData('Text');

      let regexp = regex.value;

      if (typeof regexp === 'string') {
        regexp = new RegExp(regexp);
      }
      
      if (!pastedData.split('').every(c => !!c.match(regexp))) {
        e.preventDefault();
      }
    }

    context.emit('paste', e, $this);
  };

  // ============== WATCHERS ==============

  (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(search, (val) => {
    if (!isOpen.value && val) {
      open();
    }

    context.emit('search-change', val, $this);
  });

  return {
    search,
    input,
    clearSearch,
    handleSearchInput,
    handleKeypress,
    handlePaste,
  }
}

function usePointer$1 (props, context, dep)
{
  const { groupSelect, mode, groups, disabledProp } = (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRefs)(props);

  // ================ DATA ================

  const pointer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);

  // =============== METHODS ==============

  const setPointer = (option) => {
    if (option === undefined || (option !== null && option[disabledProp.value])) {
      return
    }

    if (groups.value && option && option.group && (mode.value === 'single' || !groupSelect.value)) {
      return
    }

    pointer.value = option;
  };

  const clearPointer = () => {
    setPointer(null);
  };

  return {
    pointer,
    setPointer,
    clearPointer,
  }
}

function normalize (str, strict = true) {
  return strict
    ? String(str).toLowerCase().trim()
    : String(str).toLowerCase()
                 .normalize('NFD')
                 .trim()
                 .replace(new RegExp(/æ/g), 'ae')
                 .replace(new RegExp(/œ/g), 'oe')
                 .replace(new RegExp(/ø/g), 'o')
                 .replace(/\p{Diacritic}/gu, '')
}

function isObject (variable) {
  return Object.prototype.toString.call(variable) === '[object Object]'
}

function arraysEqual (array1, array2) {
  const array2Sorted = array2.slice().sort();

  return array1.length === array2.length && array1.slice().sort().every(function(value, index) {
      return value === array2Sorted[index];
  })
}

function useOptions (props, context, dep)
{
  const { 
    options, mode, trackBy: trackBy_, limit, hideSelected, createTag, createOption: createOption_, label,
    appendNewTag, appendNewOption: appendNewOption_, multipleLabel, object, loading, delay, resolveOnLoad,
    minChars, filterResults, clearOnSearch, clearOnSelect, valueProp, allowAbsent, groupLabel,
    canDeselect, max, strict, closeOnSelect, closeOnDeselect, groups: groupped, reverse, infinite,
    groupOptions, groupHideEmpty, groupSelect, onCreate, disabledProp, searchStart, searchFilter,
  } = (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRefs)(props);

  const $this = (0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)().proxy;

  // ============ DEPENDENCIES ============

  const iv = dep.iv;
  const ev = dep.ev;
  const search = dep.search;
  const clearSearch = dep.clearSearch;
  const update = dep.update;
  const pointer = dep.pointer;
  const clearPointer = dep.clearPointer;
  const focus = dep.focus;
  const deactivate = dep.deactivate;
  const close = dep.close;
  const localize = dep.localize;

  // ================ DATA ================

  // no export
  // appendedOptions
  const ap = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);

  // no export
  // resolvedOptions
  const ro = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);

  const resolving = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);

  // no export
  const searchWatcher = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);

  const offset = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(infinite.value && limit.value === -1 ? 10 : limit.value);

  // ============== COMPUTED ==============

  // no export
  const createOption = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return createTag.value || createOption_.value || false
  });

  // no export
  const appendNewOption = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    if (appendNewTag.value !== undefined) {
      return appendNewTag.value
    } else if (appendNewOption_.value !== undefined) {
      return appendNewOption_.value
    }

    return true
  });

  // no export
  // extendedOptions
  const eo = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    if (groupped.value) {
      let groups = eg.value || /* istanbul ignore next */ [];

      let eo = [];

      groups.forEach((group) => {
        optionsToArray(group[groupOptions.value]).forEach((option) => {
          eo.push(Object.assign({}, option, group[disabledProp.value] ? { [disabledProp.value]: true } : {}));
        });
      });

      return eo
    } else {
      let eo = optionsToArray(ro.value || /* istanbul ignore next */ []);

      if (ap.value.length) {
        eo = eo.concat(ap.value);
      }

      return eo
    }
  });

  // preFilteredOptions
  const pfo = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    let options = eo.value;

    if (reverse.value) {
      options = options.reverse();
    }

    if (createdOption.value.length) {
      options = createdOption.value.concat(options);
    }

    return filterOptions(options)
  });

  // filteredOptions
  const fo = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    let options = pfo.value;

    if (offset.value > 0) {
      options = options.slice(0, offset.value);
    }

    return options
  });

  // no export
  // extendedGroups
  const eg = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    if (!groupped.value) {
      return []
    }

    let eg = [];
    let groups = ro.value || /* istanbul ignore next */ [];

    if (ap.value.length) {
      eg.push({
        [groupLabel.value]: ' ',
        [groupOptions.value]: [...ap.value],
        __CREATE__: true
      });
    }

    return eg.concat(groups)
  });

  // preFilteredGroups
  const pfg = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    let groups = [...eg.value].map(g => ({...g}));

    if (createdOption.value.length) {
      if (groups[0] && groups[0].__CREATE__) {
        groups[0][groupOptions.value] = [...createdOption.value, ...groups[0][groupOptions.value]];
      } else {
        groups = [{
          [groupLabel.value]: ' ',
          [groupOptions.value]: [...createdOption.value],
          __CREATE__: true
        }].concat(groups);
      }
    }

    return groups
  });

  // filteredGroups
  const fg = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    if (!groupped.value) {
      return []
    }

    let options = pfg.value;

    return filterGroups((options || /* istanbul ignore next */ []).map((group, index) => {
      const arrayOptions = optionsToArray(group[groupOptions.value]);

      return {
        ...group,
        index,
        group: true,
        [groupOptions.value]: filterOptions(arrayOptions, false).map(o => Object.assign({}, o, group[disabledProp.value] ? { [disabledProp.value]: true } : {})),
        __VISIBLE__: filterOptions(arrayOptions).map(o => Object.assign({}, o, group[disabledProp.value] ? { [disabledProp.value]: true } : {})),
      }
      // Difference between __VISIBLE__ and {groupOptions}: visible does not contain selected options when hideSelected=true
    }))
  });

  const hasSelected = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    switch (mode.value) {
      case 'single':
        return !isNullish(iv.value[valueProp.value])

      case 'multiple':
      case 'tags':
        return !isNullish(iv.value) && iv.value.length > 0
    }
  });

  const multipleLabelText = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return multipleLabel !== undefined && multipleLabel.value !== undefined
      ? multipleLabel.value(iv.value, $this)
      : (iv.value && iv.value.length > 1 ? `${iv.value.length} options selected` : `1 option selected`)
  });

  const noOptions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return !eo.value.length && !resolving.value && !createdOption.value.length
  });


  const noResults = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return eo.value.length > 0 && fo.value.length == 0 && ((search.value && groupped.value) || !groupped.value)
  });

  // no export
  const createdOption = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    if (createOption.value === false || !search.value) {
      return []
    }

    if (getOptionByTrackBy(search.value) !== -1) {
      return []
    }

    return [{
      [valueProp.value]: search.value,
      [trackBy.value]: search.value,
      [label.value]: search.value,
      __CREATE__: true,
    }]
  });

  const trackBy = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return trackBy_.value || label.value
  });

  // no export
  const nullValue = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    switch (mode.value) {
      case 'single':
        return null

      case 'multiple':
      case 'tags':
        return []
    }
  });

  const busy = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return loading.value || resolving.value
  });

  // =============== METHODS ==============

  /**
   * @param {array|object|string|number} option 
   */
  const select = (option) => {
    if (typeof option !== 'object') {
      option = getOption(option);
    }

    switch (mode.value) {
      case 'single':
        update(option);
        break

      case 'multiple':
      case 'tags':
        update((iv.value).concat(option));
        break
    }

    context.emit('select', finalValue(option), option, $this);
  };

  const deselect = (option) => {
    if (typeof option !== 'object') {
      option = getOption(option);
    }

    switch (mode.value) {
      case 'single':
        clear();
        break

      case 'tags':
      case 'multiple':
        update(Array.isArray(option)
          ? iv.value.filter(v => option.map(o => o[valueProp.value]).indexOf(v[valueProp.value]) === -1)
          : iv.value.filter(v => v[valueProp.value] != option[valueProp.value]));
        break
    }

    context.emit('deselect', finalValue(option), option, $this);
  };

  // no export
  const finalValue = (option) => {
    return object.value ? option : option[valueProp.value]
  };

  const remove = (option) => {
    deselect(option);
  };

  const handleTagRemove = (option, e) => {
    if (e.button !== 0) {
      e.preventDefault();
      return
    }

    remove(option);
  };

  const clear = () => {
    context.emit('clear', $this);
    update(nullValue.value);
  };

  const isSelected = (option) => {
    if (option.group !== undefined) {
      return mode.value === 'single' ? false : areAllSelected(option[groupOptions.value]) && option[groupOptions.value].length
    }

    switch (mode.value) {
      case 'single':
        return !isNullish(iv.value) && iv.value[valueProp.value] == option[valueProp.value]

      case 'tags':
      case 'multiple':
        return !isNullish(iv.value) && iv.value.map(o => o[valueProp.value]).indexOf(option[valueProp.value]) !== -1
    }
  };

  const isDisabled = (option) => {
    return option[disabledProp.value] === true
  };

  const isMax = () => {
    if (max === undefined || max.value === -1 || (!hasSelected.value && max.value > 0)) {
      return false
    }
    
    return iv.value.length >= max.value
  };

  const handleOptionClick = (option) => {
    if (isDisabled(option)) {
      return
    }

    if (onCreate && onCreate.value && !isSelected(option) && option.__CREATE__) {
      option = { ...option };
      delete option.__CREATE__;

      option = onCreate.value(option, $this);
      
      if (option instanceof Promise) {
        resolving.value = true;
        option.then((result) => {
          resolving.value = false;
          handleOptionSelect(result);
        });

        return
      } 
    }

    handleOptionSelect(option);
  };

  const handleOptionSelect = (option) => {
    if (option.__CREATE__) {
      option = { ...option };
      delete option.__CREATE__;
    }
    
    switch (mode.value) {
      case 'single':
        if (option && isSelected(option)) {
          if (canDeselect.value) {
            deselect(option);
          }

          if (closeOnDeselect.value) {
            clearPointer();
            close();
          }
          return
        }

        if (option) {
          handleOptionAppend(option);
        }

        /* istanbul ignore else */
        if (clearOnSelect.value) {
          clearSearch();
        }

        if (closeOnSelect.value) {
          clearPointer();
          close();
        }

        if (option) {
          select(option);
        }
        break

      case 'multiple':
        if (option && isSelected(option)) {
          deselect(option);

          if (closeOnDeselect.value) {
            clearPointer();
            close();
          }
          return
        }

        if (isMax()) {
          context.emit('max', $this);
          return
        }

        if (option) {
          handleOptionAppend(option);
          select(option);
        }

        if (clearOnSelect.value) {
          clearSearch();
        }

        if (hideSelected.value) {
          clearPointer();
        }

        if (closeOnSelect.value) {
          close();
        }
        break

      case 'tags':
        if (option && isSelected(option)) {
          deselect(option);

          if (closeOnDeselect.value) {
            clearPointer();
            close();
          }
          return
        }

        if (isMax()) {
          context.emit('max', $this);
          return
        }

        if (option) {
          handleOptionAppend(option);
        }

        if (clearOnSelect.value) {
          clearSearch();
        }

        if (option) {
          select(option);
        }

        if (hideSelected.value) {
          clearPointer();
        }

        if (closeOnSelect.value) {
          close();
        }
        break
    }

    if (!closeOnSelect.value) {
      focus();
    }
  };

  const handleGroupClick = (group) => {
    if (isDisabled(group) || mode.value === 'single' || !groupSelect.value) {
      return
    }

    switch (mode.value) {
      case 'multiple':
      case 'tags':
        if (areAllEnabledSelected(group[groupOptions.value])) {
          deselect(group[groupOptions.value]);
        } else {
          select(group[groupOptions.value]
            .filter(o => iv.value.map(v => v[valueProp.value]).indexOf(o[valueProp.value]) === -1)
            .filter(o => !o[disabledProp.value])
            .filter((o, k) => iv.value.length + 1 + k <= max.value || max.value === -1)
          );
        }
        break
    }

    if (closeOnSelect.value) {
      deactivate();
    }
  };

  const handleOptionAppend = (option) => {
    if (getOption(option[valueProp.value]) === undefined && createOption.value) {
      context.emit('tag', option[valueProp.value], $this);
      context.emit('option', option[valueProp.value], $this);
      context.emit('create', option[valueProp.value], $this);

      if (appendNewOption.value) {
        appendOption(option);
      }

      clearSearch();
    }
  };

  const selectAll = () => {
    if (mode.value === 'single') {
      return
    }

    select(fo.value.filter(o => !o.disabled && !isSelected(o)));
  };

  // no export
  const areAllEnabledSelected = (options) => {
    return options.find(o => !isSelected(o) && !o[disabledProp.value]) === undefined
  };

  // no export
  const areAllSelected = (options) => {
    return options.find(o => !isSelected(o)) === undefined
  };

  const getOption = (val) => {
    return eo.value[eo.value.map(o => String(o[valueProp.value])).indexOf(String(val))]
  };

  // no export
  const getOptionByTrackBy = (val, norm = true) => {
    return eo.value.map(o => parseInt(o[trackBy.value]) == o[trackBy.value] ? parseInt(o[trackBy.value]) : o[trackBy.value]).indexOf(
      parseInt(val) == val ? parseInt(val) : val
    )
  };

  // no export
  const shouldHideOption = (option) => {
    return ['tags', 'multiple'].indexOf(mode.value) !== -1 && hideSelected.value && isSelected(option)
  };

  // no export
  const appendOption = (option) => {
    ap.value.push(option);
  };

  // no export
  const filterGroups = (groups) => {
    // If the search has value we need to filter among 
    // the ones that are visible to the user to avoid
    // displaying groups which technically have options
    // based on search but that option is already selected.
    return groupHideEmpty.value
      ? groups.filter(g => search.value
          ? g.__VISIBLE__.length
          : g[groupOptions.value].length
        )
      : groups.filter(g => search.value ? g.__VISIBLE__.length : true)
  };

  // no export
  const filterOptions = (options, excludeHideSelected = true) => {
    let fo = options;
    
    if (search.value && filterResults.value) {
      let filter = searchFilter.value;

      if (!filter) {
        filter = (option, $this) => {
          let target = normalize(localize(option[trackBy.value]), strict.value);

          return searchStart.value
            ? target.startsWith(normalize(search.value, strict.value))
            : target.indexOf(normalize(search.value, strict.value)) !== -1
        };
      }

      fo = fo.filter(filter);
    }

    if (hideSelected.value && excludeHideSelected) {
      fo = fo.filter((option) => !shouldHideOption(option));
    }

    return fo
  };

  // no export
  const optionsToArray = (options) => {
    let uo = options;
    
    // Transforming an object to an array of objects
    if (isObject(uo)) {
      uo = Object.keys(uo).map((key) => {
        let val = uo[key];

        return { [valueProp.value]: key, [trackBy.value]: val, [label.value]: val}
      });
    }

    // Transforming an plain arrays to an array of objects
    uo = uo.map((val) => {
      return typeof val === 'object' ? val : { [valueProp.value]: val, [trackBy.value]: val, [label.value]: val}
    });

    return uo
  };

  // no export
  const initInternalValue = () => {
    if (!isNullish(ev.value)) {
      iv.value = makeInternal(ev.value);
    }
  };

  const resolveOptions = (callback) => {
    resolving.value = true;

    return new Promise((resolve, reject) => {
      options.value(search.value, $this).then((response) => {
        ro.value = response || [];

        if (typeof callback == 'function') {
          callback(response);
        }

        resolving.value = false;
      }).catch((e) => {
        console.error(e);

        ro.value = [];

        resolving.value = false;
      }).finally(() => {
        resolve();
      });
    })
  };

  // no export
  const refreshLabels = () => {
    if (!hasSelected.value) {
      return
    }

    if (mode.value === 'single') {
      let option = getOption(iv.value[valueProp.value]);

      /* istanbul ignore else */
      if (option !== undefined) {
        let newLabel = option[label.value];

        iv.value[label.value] = newLabel;

        if (object.value) {
          ev.value[label.value] = newLabel;
        }
      }
    } else {
      iv.value.forEach((val, i) => {
        let option = getOption(iv.value[i][valueProp.value]);

        /* istanbul ignore else */
        if (option !== undefined) {
          let newLabel = option[label.value];

          iv.value[i][label.value] = newLabel;

          if (object.value) {
            ev.value[i][label.value] = newLabel;
          }
        }
      });
    }
  };

  const refreshOptions = (callback) => {
    resolveOptions(callback);
  };

  // no export
  const makeInternal = (val) => {
    if (isNullish(val)) {
      return mode.value === 'single' ? {} : []
    }

    if (object.value) {
      return val
    }

    // If external should be plain transform value object to plain values
    return mode.value === 'single' ? getOption(val) || (allowAbsent.value ? {
      [label.value]: val,
      [valueProp.value]: val,
      [trackBy.value]: val,
    } : {}) : val.filter(v => !!getOption(v) || allowAbsent.value).map(v => getOption(v) || {
      [label.value]: v,
      [valueProp.value]: v,
      [trackBy.value]: v,
    })
  };

  // no export
  const initSearchWatcher = () => {
    searchWatcher.value = (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(search, (query) => {
      if (query.length < minChars.value || (!query && minChars.value !== 0)) {
        return
      }

      resolving.value = true;

      if (clearOnSearch.value) {
        ro.value = [];
      }
      setTimeout(() => {
        if (query != search.value) {
          return
        }

        options.value(search.value, $this).then((response) => {
          if (query == search.value || !search.value) {
            ro.value = response;
            pointer.value = fo.value.filter(o => o[disabledProp.value] !== true)[0] || null;
            resolving.value = false;
          }
        }).catch( /* istanbul ignore next */ (e) => {
          console.error(e);
        });
      }, delay.value);

    }, { flush: 'sync' });
  };

  // ================ HOOKS ===============

  if (mode.value !== 'single' && !isNullish(ev.value) && !Array.isArray(ev.value)) {
    throw new Error(`v-model must be an array when using "${mode.value}" mode`)
  }

  if (options && typeof options.value == 'function') {
    if (resolveOnLoad.value) {
      resolveOptions(initInternalValue);
    } else if (object.value == true) {
      initInternalValue();
    }
  }
  else {
    ro.value = options.value;

    initInternalValue();
  }
  
  // ============== WATCHERS ==============

  if (delay.value > -1) {
    initSearchWatcher();
  }

  (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(delay, (value, old) => {
    /* istanbul ignore else */
    if (searchWatcher.value) {
      searchWatcher.value();
    }

    if (value >= 0) {
      initSearchWatcher();
    }
  });

  (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(ev, (newValue) => {
    if (isNullish(newValue)) {
      update(makeInternal(newValue), false);
      return
    }

    switch (mode.value) {
      case 'single':
        if (object.value ? newValue[valueProp.value] != iv.value[valueProp.value] : newValue != iv.value[valueProp.value]) {
          update(makeInternal(newValue), false);
        }
        break

      case 'multiple':
      case 'tags':
        if (!arraysEqual(object.value ? newValue.map(o => o[valueProp.value]) : newValue, iv.value.map(o => o[valueProp.value]))) {
          update(makeInternal(newValue), false);
        }
        break
    }
  }, { deep: true });

  (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(options, (n, o) => {
    if (typeof props.options === 'function') {
      if (resolveOnLoad.value && (!o || (n && n.toString() !== o.toString()))) {
        resolveOptions();
      }
    } else {
      ro.value = props.options;

      if (!Object.keys(iv.value).length) {
        initInternalValue();
      }

      refreshLabels();
    }
  });

  (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(label, refreshLabels);

  return {
    pfo,
    fo,
    filteredOptions: fo,
    hasSelected,
    multipleLabelText,
    eo,
    extendedOptions: eo,
    eg,
    extendedGroups: eg,
    fg,
    filteredGroups: fg,
    noOptions,
    noResults,
    resolving,
    busy,
    offset,
    select,
    deselect,
    remove,
    selectAll,
    clear,
    isSelected,
    isDisabled,
    isMax,
    getOption,
    handleOptionClick,
    handleGroupClick,
    handleTagRemove,
    refreshOptions,
    resolveOptions,
    refreshLabels,
  }
}

function usePointer (props, context, dep)
{
  const {
    valueProp, showOptions, searchable, groupLabel,
    groups: groupped, mode, groupSelect, disabledProp,
    groupOptions,
  } = (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRefs)(props);

  // ============ DEPENDENCIES ============

  const fo = dep.fo;
  const fg = dep.fg;
  const handleOptionClick = dep.handleOptionClick;
  const handleGroupClick = dep.handleGroupClick;
  const search = dep.search;
  const pointer = dep.pointer;
  const setPointer = dep.setPointer;
  const clearPointer = dep.clearPointer;
  const multiselect = dep.multiselect;
  const isOpen = dep.isOpen;

  // ============== COMPUTED ==============

  // no export
  const options = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return fo.value.filter(o => !o[disabledProp.value])
  });

  const groups = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return fg.value.filter(g => !g[disabledProp.value])
  });

  const canPointGroups = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return mode.value !== 'single' && groupSelect.value
  });

  const isPointerGroup = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return pointer.value && pointer.value.group
  });

  const currentGroup = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return getParentGroup(pointer.value)
  });

  const prevGroup = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const group = isPointerGroup.value ? pointer.value : /* istanbul ignore next */ getParentGroup(pointer.value);
    const groupIndex = groups.value.map(g => g[groupLabel.value]).indexOf(group[groupLabel.value]);
    let prevGroup = groups.value[groupIndex - 1];

    if (prevGroup === undefined) {
      prevGroup = lastGroup.value;
    }

    return prevGroup
  });
  
  const nextGroup = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    let nextIndex = groups.value.map(g => g.label).indexOf(isPointerGroup.value
      ? pointer.value[groupLabel.value]
      : getParentGroup(pointer.value)[groupLabel.value]) + 1;

    if (groups.value.length <= nextIndex) {
      nextIndex = 0;
    }

    return groups.value[nextIndex]
  });

  const lastGroup = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return [...groups.value].slice(-1)[0]
  });
  
  const currentGroupFirstEnabledOption = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return pointer.value.__VISIBLE__.filter(o => !o[disabledProp.value])[0]
  });

  const currentGroupPrevEnabledOption = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const options = currentGroup.value.__VISIBLE__.filter(o => !o[disabledProp.value]);
    return options[options.map(o => o[valueProp.value]).indexOf(pointer.value[valueProp.value]) - 1]
  });
  
  const currentGroupNextEnabledOption = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const options = getParentGroup(pointer.value).__VISIBLE__.filter(o => !o[disabledProp.value]);
    return options[options.map(o => o[valueProp.value]).indexOf(pointer.value[valueProp.value]) + 1]
  });

  const prevGroupLastEnabledOption = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return [...prevGroup.value.__VISIBLE__.filter(o => !o[disabledProp.value])].slice(-1)[0]
  });

  const lastGroupLastEnabledOption = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return [...lastGroup.value.__VISIBLE__.filter(o => !o[disabledProp.value])].slice(-1)[0]
  });

  // =============== METHODS ==============

  const isPointed = (option) => {
    return (!!pointer.value && (
      (!option.group && pointer.value[valueProp.value] === option[valueProp.value]) ||
      (option.group !== undefined && pointer.value[groupLabel.value] === option[groupLabel.value])
    )) ? true : undefined
  };

  const setPointerFirst = () => {
    setPointer(options.value[0] || null);
  };

  const selectPointer = () => {
    if (!pointer.value || pointer.value[disabledProp.value] === true) {
      return
    }

    if (isPointerGroup.value) {
      handleGroupClick(pointer.value);
    } else {
      handleOptionClick(pointer.value);
    }
  };

  const forwardPointer = () => {
    if (pointer.value === null) {
      setPointer((groupped.value && canPointGroups.value ? (!groups.value[0].__CREATE__ ? groups.value[0] : options.value[0]) : options.value[0]) || null);
    }
    else if (groupped.value && canPointGroups.value) {
      let nextPointer = isPointerGroup.value ? currentGroupFirstEnabledOption.value : currentGroupNextEnabledOption.value;

      if (nextPointer === undefined) {
        nextPointer = nextGroup.value;

        if (nextPointer.__CREATE__) {
          nextPointer = nextPointer[groupOptions.value][0];
        }
      }

      setPointer(nextPointer || /* istanbul ignore next */ null);
    } else {
      let next = options.value.map(o => o[valueProp.value]).indexOf(pointer.value[valueProp.value]) + 1;

      if (options.value.length <= next) {
        next = 0;
      }

      setPointer(options.value[next] || null);
    }

    (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
      adjustWrapperScrollToPointer();
    });
  };

  const backwardPointer = () => {
    if (pointer.value === null) {
      let prevPointer = options.value[options.value.length - 1];

      if (groupped.value && canPointGroups.value) {
        prevPointer = lastGroupLastEnabledOption.value;

        if (prevPointer === undefined) {
          prevPointer = lastGroup.value;
        }
      }

      setPointer(prevPointer  || null);
    }
    else if (groupped.value && canPointGroups.value) {
      let prevPointer = isPointerGroup.value ? prevGroupLastEnabledOption.value : currentGroupPrevEnabledOption.value;

      if (prevPointer === undefined) {
        prevPointer = isPointerGroup.value ? prevGroup.value : currentGroup.value;

        if (prevPointer.__CREATE__) {
          prevPointer = prevGroupLastEnabledOption.value;

          if (prevPointer === undefined) {
            prevPointer = prevGroup.value;
          }
        }
      }

      setPointer(prevPointer || /* istanbul ignore next */ null);
    } else {
      let prevIndex = options.value.map(o => o[valueProp.value]).indexOf(pointer.value[valueProp.value]) - 1;

      if (prevIndex < 0) {
        prevIndex = options.value.length - 1;
      }

      setPointer(options.value[prevIndex] || null);
    }

    (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
      adjustWrapperScrollToPointer();
    });
  };

  const getParentGroup = (option) => {
    return groups.value.find((group) => {
      return group.__VISIBLE__.map(o => o[valueProp.value]).indexOf(option[valueProp.value]) !== -1
    })
  };

  // no export
  /* istanbul ignore next */
  const adjustWrapperScrollToPointer = () => {
    let pointedOption = multiselect.value.querySelector(`[data-pointed]`);

    if (!pointedOption) {
      return
    }

    let wrapper = pointedOption.parentElement.parentElement;

    if (groupped.value) {
      wrapper = isPointerGroup.value
        ? pointedOption.parentElement.parentElement.parentElement
        : pointedOption.parentElement.parentElement.parentElement.parentElement;
    }

    if (pointedOption.offsetTop + pointedOption.offsetHeight > wrapper.clientHeight + wrapper.scrollTop) {
      wrapper.scrollTop = pointedOption.offsetTop + pointedOption.offsetHeight - wrapper.clientHeight;
    }
    
    if (pointedOption.offsetTop < wrapper.scrollTop) {
      wrapper.scrollTop = pointedOption.offsetTop;
    }
  };

  // ============== WATCHERS ==============

  (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(search, (val) => {
    if (searchable.value) {
      if (val.length && showOptions.value) {
        setPointerFirst();
      } else {
        clearPointer();
      }
    }
  });

  (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(isOpen, (val) => {
    if (val) {
      let firstSelected = multiselect.value.querySelectorAll(`[data-selected]`)[0];

      if (!firstSelected) {
        return
      }

      let wrapper = firstSelected.parentElement.parentElement;
      
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
        /* istanbul ignore next */
        if (wrapper.scrollTop > 0) {
          return
        }

        wrapper.scrollTop = firstSelected.offsetTop;
      });
    }
  });

  return {
    pointer,
    canPointGroups,
    isPointed,
    setPointerFirst,
    selectPointer,
    forwardPointer,
    backwardPointer,
  }
}

function useDropdown (props, context, dep)
{
  const { disabled } = (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRefs)(props);

  const $this = (0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)().proxy;

  // ================ DATA ================

  const isOpen = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);

  // =============== METHODS ==============

  const open = () => {
    if (isOpen.value || disabled.value) {
      return
    }

    isOpen.value = true;
    context.emit('open', $this);
  };

  const close = () => {
    if (!isOpen.value) {
      return
    }

    isOpen.value = false;
    context.emit('close', $this);
  };

  return {
    isOpen,
    open,
    close,
  }
}

function useMultiselect (props, context, dep)
{
  const { searchable, disabled, clearOnBlur } = (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRefs)(props);

  // ============ DEPENDENCIES ============

  const input = dep.input;
  const open = dep.open;
  const close = dep.close;
  const clearSearch = dep.clearSearch;
  const isOpen = dep.isOpen;

  // ================ DATA ================

  const multiselect = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
  
  const wrapper = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);

  const tags = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);

  const isActive = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);

  const mouseClicked = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);

  // ============== COMPUTED ==============

  const tabindex = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return searchable.value || disabled.value ? -1 : 0
  });

  // =============== METHODS ==============

  const blur = () => {
    if (searchable.value) {
      input.value.blur();
    }

    wrapper.value.blur();
  };

  const focus = () => {
    if (searchable.value && !disabled.value) {
      input.value.focus();
    }
  };

  const activate = (shouldOpen = true) => {
    if (disabled.value) {
      return
    }

    isActive.value = true;

    if (shouldOpen) {
      open();
    }
  };

  const deactivate = () => {
    isActive.value = false;

    setTimeout(() => {
      if (!isActive.value) {
        close();

        if (clearOnBlur.value) {
          clearSearch();
        }
      }
    }, 1);
  };

  const handleFocusIn = (e) => {
    if ((e.target.closest('[data-tags]') && e.target.nodeName !== 'INPUT') || e.target.closest('[data-clear]')) {
      return
    }

    activate(mouseClicked.value);
  };

  const handleFocusOut = () => {
    deactivate();
  };

  const handleCaretClick = () => {
    deactivate();
    blur();
  };

  /* istanbul ignore next */
  const handleMousedown = (e) => {
    mouseClicked.value = true;

    if (isOpen.value && (e.target.isEqualNode(wrapper.value) || e.target.isEqualNode(tags.value))) {
      setTimeout(() => {
        deactivate();
      }, 0);
    } else if (document.activeElement.isEqualNode(wrapper.value) && !isOpen.value) {
      activate();    
    }

    setTimeout(() => {
      mouseClicked.value = false;
    }, 0);
  };

  return {
    multiselect,
    wrapper,
    tags,
    tabindex,
    isActive,
    mouseClicked,
    blur,
    focus,
    activate,
    deactivate,
    handleFocusIn,
    handleFocusOut,
    handleCaretClick,
    handleMousedown,
  }
}

function useKeyboard (props, context, dep)
{
  const {
    mode, addTagOn, openDirection, searchable,
    showOptions, valueProp, groups: groupped,
    addOptionOn: addOptionOn_, createTag, createOption: createOption_,
    reverse,
  } = (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRefs)(props);

  const $this = (0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)().proxy;

  // ============ DEPENDENCIES ============

  const iv = dep.iv;
  const update = dep.update;
  const search = dep.search;
  const setPointer = dep.setPointer;
  const selectPointer = dep.selectPointer;
  const backwardPointer = dep.backwardPointer;
  const forwardPointer = dep.forwardPointer;
  const multiselect = dep.multiselect;
  const wrapper = dep.wrapper;
  const tags = dep.tags;
  const isOpen = dep.isOpen;
  const open = dep.open;
  const blur = dep.blur;
  const fo = dep.fo;

  // ============== COMPUTED ==============

  // no export
  const createOption = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return createTag.value || createOption_.value || false
  });

  // no export
  const addOptionOn = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    if (addTagOn.value !== undefined) {
      return addTagOn.value
    }
    else if (addOptionOn_.value !== undefined) {
      return addOptionOn_.value
    }

    return ['enter']
  });

  // =============== METHODS ==============

  // no export
  const preparePointer = () => {
    // When options are hidden and creating tags is allowed
    // no pointer will be set (because options are hidden).
    // In such case we need to set the pointer manually to the 
    // first option, which equals to the option created from
    // the search value.
    if (mode.value === 'tags' && !showOptions.value && createOption.value && searchable.value && !groupped.value) {
      setPointer(fo.value[fo.value.map(o => o[valueProp.value]).indexOf(search.value)]);
    }
  };

  const removeLastRemovable = (arr) => {
    // Find the index of the last object in the array that doesn't have a "remove" property set to false
    let indexToRemove = arr.length - 1;
    while (indexToRemove >= 0 && (arr[indexToRemove].remove === false || arr[indexToRemove].disabled)) {
      indexToRemove--;
    }

    // If all objects have a "remove" property set to false, don't remove anything and return the original array
    if (indexToRemove < 0) {
      return arr
    }

    // Remove the object at the found index and return the updated array
    arr.splice(indexToRemove, 1);
    return arr
  };

  const handleKeydown = (e) => {
    context.emit('keydown', e, $this);

    let tagList;
    let activeIndex;

    if (['ArrowLeft', 'ArrowRight', 'Enter'].indexOf(e.key) !== -1 && mode.value === 'tags') {
      tagList = [...(multiselect.value.querySelectorAll(`[data-tags] > *`))].filter(e => e !== tags.value);
      activeIndex = tagList.findIndex(e => e === document.activeElement);
    }

    switch (e.key) {
      case 'Backspace':
        if (mode.value === 'single') {
          return
        }

        if (searchable.value && [null, ''].indexOf(search.value) === -1) {
          return
        }

        if (iv.value.length === 0) {
          return
        }

        update(removeLastRemovable([...iv.value]));
        break

      case 'Enter':
        e.preventDefault();

        if (e.keyCode === 229) {
          // ignore IME confirmation
          return
        }

        if (activeIndex !== -1 && activeIndex !== undefined) {
          update([...iv.value].filter((v, k) => k !== activeIndex));

          if (activeIndex === tagList.length - 1) {
            if (tagList.length - 1) {
              tagList[tagList.length - 2].focus();
            } else if (searchable.value) {
              tags.value.querySelector('input').focus();
            } else {
              wrapper.value.focus();
            }
          }
          return
        }

        if (addOptionOn.value.indexOf('enter') === -1 && createOption.value) {
          return
        }
        
        preparePointer();
        selectPointer();
        break

      case ' ':
        if (!createOption.value && !searchable.value) {
          e.preventDefault();
          
          preparePointer();
          selectPointer();
          return
        }

        if (!createOption.value) {
          return false
        } 

        if (addOptionOn.value.indexOf('space') === -1 && createOption.value) {
          return
        }

        e.preventDefault();
        
        preparePointer();
        selectPointer();
        break
      
      case 'Tab':
      case ';':
      case ',':
        if (addOptionOn.value.indexOf(e.key.toLowerCase()) === -1 || !createOption.value) {
          return
        }

        preparePointer();
        selectPointer();
        e.preventDefault();
        break

      case 'Escape':
        blur();
        break

      case 'ArrowUp':
        e.preventDefault();

        if (!showOptions.value) {
          return
        }

        /* istanbul ignore else */
        if (!isOpen.value) {
          open();
        }
        
        backwardPointer();
        break

      case 'ArrowDown':
        e.preventDefault();

        if (!showOptions.value) {
          return
        }

        /* istanbul ignore else */
        if (!isOpen.value) {
          open();
        }

        forwardPointer();
        break

      case 'ArrowLeft':
        if (
          (searchable.value && tags.value && tags.value.querySelector('input').selectionStart)
          || e.shiftKey || mode.value !== 'tags' || !iv.value || !iv.value.length
        ) {
          return
        }

        e.preventDefault();

        if (activeIndex === -1) {
          tagList[tagList.length-1].focus();
        }
        else if (activeIndex > 0) {
          tagList[activeIndex-1].focus();
        }
        break

      case 'ArrowRight':
        if (activeIndex === -1 || e.shiftKey || mode.value !== 'tags' || !iv.value || !iv.value.length) {
          return
        }

        e.preventDefault();
        
        /* istanbul ignore else */
        if (tagList.length > activeIndex + 1) {
          tagList[activeIndex+1].focus();
        }
        else if (searchable.value) {
          tags.value.querySelector('input').focus();
        }
        else if (!searchable.value) {
          wrapper.value.focus();
        }
        
        break
    }
  };

  const handleKeyup = (e) => {
    context.emit('keyup', e, $this);
  };

  return {
    handleKeydown,
    handleKeyup,
    preparePointer,
  }
}

function useClasses (props, context, dependencies)
{const { 
    classes: classes_, disabled, openDirection, showOptions
  } = (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRefs)(props);

  // ============ DEPENDENCIES ============

  const isOpen = dependencies.isOpen;
  const isPointed = dependencies.isPointed;
  const isSelected = dependencies.isSelected;
  const isDisabled = dependencies.isDisabled;
  const isActive = dependencies.isActive;
  const canPointGroups = dependencies.canPointGroups;
  const resolving = dependencies.resolving;
  const fo = dependencies.fo;

  const classes = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => ({
    container: 'multiselect',
    containerDisabled: 'is-disabled',
    containerOpen: 'is-open',
    containerOpenTop: 'is-open-top',
    containerActive: 'is-active',
    wrapper: 'multiselect-wrapper',
    singleLabel: 'multiselect-single-label',
    singleLabelText: 'multiselect-single-label-text',
    multipleLabel: 'multiselect-multiple-label',
    search: 'multiselect-search',
    tags: 'multiselect-tags',
    tag: 'multiselect-tag',
    tagDisabled: 'is-disabled',
    tagRemove: 'multiselect-tag-remove',
    tagRemoveIcon: 'multiselect-tag-remove-icon',
    tagsSearchWrapper: 'multiselect-tags-search-wrapper',
    tagsSearch: 'multiselect-tags-search',
    tagsSearchCopy: 'multiselect-tags-search-copy',
    placeholder: 'multiselect-placeholder',
    caret: 'multiselect-caret',
    caretOpen: 'is-open',
    clear: 'multiselect-clear',
    clearIcon: 'multiselect-clear-icon',
    spinner: 'multiselect-spinner',
    inifinite: 'multiselect-inifite',
    inifiniteSpinner: 'multiselect-inifite-spinner',
    dropdown: 'multiselect-dropdown',
    dropdownTop: 'is-top',
    dropdownHidden: 'is-hidden',
    options: 'multiselect-options',
    optionsTop: 'is-top',
    group: 'multiselect-group',
    groupLabel: 'multiselect-group-label',
    groupLabelPointable: 'is-pointable',
    groupLabelPointed: 'is-pointed',
    groupLabelSelected: 'is-selected',
    groupLabelDisabled: 'is-disabled',
    groupLabelSelectedPointed: 'is-selected is-pointed',
    groupLabelSelectedDisabled: 'is-selected is-disabled',
    groupOptions: 'multiselect-group-options',
    option: 'multiselect-option',
    optionPointed: 'is-pointed',
    optionSelected: 'is-selected',
    optionDisabled: 'is-disabled',
    optionSelectedPointed: 'is-selected is-pointed',
    optionSelectedDisabled: 'is-selected is-disabled',
    noOptions: 'multiselect-no-options',
    noResults: 'multiselect-no-results',
    fakeInput: 'multiselect-fake-input',
    assist: 'multiselect-assistive-text',
    spacer: 'multiselect-spacer',
    ...classes_.value,
  }));

  // ============== COMPUTED ==============

  const showDropdown = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return !!(isOpen.value && showOptions.value && (!resolving.value || (resolving.value && fo.value.length)))
  });

  const classList = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    const c = classes.value;

    return {
      container: [c.container]
        .concat(disabled.value ? c.containerDisabled : [])
        .concat(showDropdown.value && openDirection.value === 'top'  ? c.containerOpenTop : [])
        .concat(showDropdown.value && openDirection.value !== 'top' ? c.containerOpen : [])
        .concat(isActive.value ? c.containerActive : []),
      wrapper: c.wrapper,
      spacer: c.spacer,
      singleLabel: c.singleLabel,
      singleLabelText: c.singleLabelText,
      multipleLabel: c.multipleLabel,
      search: c.search,
      tags: c.tags,
      tag: [c.tag]
        .concat(disabled.value ? c.tagDisabled : []),
      tagDisabled: c.tagDisabled,
      tagRemove: c.tagRemove,
      tagRemoveIcon: c.tagRemoveIcon,
      tagsSearchWrapper: c.tagsSearchWrapper,
      tagsSearch: c.tagsSearch,
      tagsSearchCopy: c.tagsSearchCopy,
      placeholder: c.placeholder,
      caret: [c.caret]
        .concat(isOpen.value ? c.caretOpen : []),
      clear: c.clear,
      clearIcon: c.clearIcon,
      spinner: c.spinner,
      inifinite: c.inifinite,
      inifiniteSpinner: c.inifiniteSpinner,
      dropdown: [c.dropdown]
        .concat(openDirection.value === 'top' ? c.dropdownTop : [])
        .concat(!isOpen.value || !showOptions.value || !showDropdown.value ? c.dropdownHidden : []),
      options: [c.options]
        .concat(openDirection.value === 'top' ? c.optionsTop : []),
      group: c.group,
      groupLabel: (g) => {
        let groupLabel = [c.groupLabel];

        if (isPointed(g)) {
          groupLabel.push(isSelected(g) ? c.groupLabelSelectedPointed : c.groupLabelPointed);
        } else if (isSelected(g) && canPointGroups.value) {
          groupLabel.push(isDisabled(g) ? c.groupLabelSelectedDisabled : c.groupLabelSelected);
        } else if (isDisabled(g)) {
          groupLabel.push(c.groupLabelDisabled);
        }

        if (canPointGroups.value) {
          groupLabel.push(c.groupLabelPointable);
        }

        return groupLabel
      },
      groupOptions: c.groupOptions,
      option: (o, g) => {
        let option = [c.option];

        if (isPointed(o)) {
          option.push(isSelected(o) ? c.optionSelectedPointed : c.optionPointed);
        } else if (isSelected(o)) {
          option.push(isDisabled(o) ? c.optionSelectedDisabled : c.optionSelected);
        } else if (isDisabled(o) || (g && isDisabled(g))) {
          option.push(c.optionDisabled);
        }

        return option
      },
      noOptions: c.noOptions,
      noResults: c.noResults,
      assist: c.assist,
      fakeInput: c.fakeInput,
    }
  });

  return {
    classList,
    showDropdown,
  }
}

function useScroll (props, context, dep)
{
  const {
    limit, infinite,
  } = (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRefs)(props);

  // ============ DEPENDENCIES ============

  const isOpen = dep.isOpen;
  const offset = dep.offset;
  const search = dep.search;
  const pfo = dep.pfo;
  const eo = dep.eo;

  // ================ DATA ================

  // no export
  const observer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);

  const infiniteLoader = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);

  // ============== COMPUTED ==============

  const hasMore = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return offset.value < pfo.value.length
  });

  // =============== METHODS ==============

  // no export
  /* istanbul ignore next */
  const handleIntersectionObserver = (entries) => {
    const { isIntersecting, target } = entries[0];

    if (isIntersecting) {
      const parent = target.offsetParent;
      const scrollTop = parent.scrollTop;

      offset.value += limit.value == -1 ? 10 : limit.value;

      (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
        parent.scrollTop = scrollTop;
      });
    }
  };

  const observe = () => {
    /* istanbul ignore else */
    if (isOpen.value && offset.value < pfo.value.length) {
      observer.value.observe(infiniteLoader.value);
    } else if (!isOpen.value && observer.value) {
      observer.value.disconnect();
    }
  };

  // ============== WATCHERS ==============

  (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(isOpen, () => {
    if (!infinite.value) {
      return
    }

    observe();
  });

  (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(search, () => {
    if (!infinite.value) {
      return
    }

    offset.value = limit.value;

    observe();
  }, { flush: 'post' });

  (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(eo, () => {
    if (!infinite.value) {
      return
    }

    observe();
  }, { immediate: false, flush: 'post' });

  // ================ HOOKS ===============

  (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
    /* istanbul ignore else */
    if (window && window.IntersectionObserver) {
      observer.value = new IntersectionObserver(handleIntersectionObserver);
    }
  });

  return {
    hasMore,
    infiniteLoader,
  }
}

function useA11y (props, context, dep)
{
  const {
    placeholder, id, valueProp, label: labelProp, mode, groupLabel, aria, searchable ,
  } = (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRefs)(props);

  // ============ DEPENDENCIES ============

  const pointer = dep.pointer;
  const iv = dep.iv;
  const hasSelected = dep.hasSelected;
  const multipleLabelText = dep.multipleLabelText;

  // ================ DATA ================

  const label = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);

  // ============== COMPUTED ==============

  const ariaAssist = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    let texts = [];

    if (id && id.value) {
      texts.push(id.value);
    }

    texts.push('assist');

    return texts.join('-')
  });

  const ariaControls = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    let texts = [];

    if (id && id.value) {
      texts.push(id.value);
    }

    texts.push('multiselect-options');

    return texts.join('-')
  });

  const ariaActiveDescendant = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    let texts = [];

    if (id && id.value) {
      texts.push(id.value);
    }

    if (pointer.value) {
      texts.push(pointer.value.group ? 'multiselect-group' : 'multiselect-option');

      texts.push(pointer.value.group ? pointer.value.index : pointer.value[valueProp.value]);

      return texts.join('-')
    }
  });



  const ariaPlaceholder = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return placeholder.value
  });

  const ariaMultiselectable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    return mode.value !== 'single'
  });

  const ariaLabel = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    let ariaLabel = '';

    if (mode.value === 'single' && hasSelected.value) {
      ariaLabel += iv.value[labelProp.value];
    }

    if (mode.value === 'multiple' && hasSelected.value) {
      ariaLabel += multipleLabelText.value;
    }

    if (mode.value === 'tags' && hasSelected.value) {
      ariaLabel += iv.value.map(v => v[labelProp.value]).join(', ');
    }

    return ariaLabel
  });

  const arias = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
    let arias = { ...aria.value };
    
    // Need to add manually because focusing
    // the input won't read the selected value
    if (searchable.value) {
      arias['aria-labelledby'] = arias['aria-labelledby']
        ? `${ariaAssist.value} ${arias['aria-labelledby']}`
        : ariaAssist.value;
      
      if (ariaLabel.value && arias['aria-label']) {
        arias['aria-label'] = `${ariaLabel.value}, ${arias['aria-label']}`;
      }
    }

    return arias
  });

  // =============== METHODS ==============

  const ariaOptionId = (option) => {
    let texts = [];

    if (id && id.value) {
      texts.push(id.value);
    }

    texts.push('multiselect-option');

    texts.push(option[valueProp.value]);

    return texts.join('-')
  };

  const ariaGroupId = (option) => {
    let texts = [];

    if (id && id.value) {
      texts.push(id.value);
    }

    texts.push('multiselect-group');

    texts.push(option.index);

    return texts.join('-')
  };

  const ariaOptionLabel = (label) => {
    let texts = [];

    texts.push(label);

    return texts.join(' ')
  };

  const ariaGroupLabel = (label) => {
    let texts = [];

    texts.push(label);

    return texts.join(' ')
  };

  const ariaTagLabel = (label) => {
    return `${label} ❎`
  };

  // =============== HOOKS ================

  (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
    /* istanbul ignore next */
    if (id && id.value && document && document.querySelector) {
      let forTag = document.querySelector(`[for="${id.value}"]`);
      label.value = forTag ? forTag.innerText : null;
    }
  });

  return {
    arias,
    ariaLabel,
    ariaAssist,
    ariaControls,
    ariaPlaceholder,
    ariaMultiselectable,
    ariaActiveDescendant,
    ariaOptionId,
    ariaOptionLabel,
    ariaGroupId,
    ariaGroupLabel,
    ariaTagLabel,
  }
}

function useI18n (props, context, dep)
{
  const {
    locale, fallbackLocale,
  } = (0,vue__WEBPACK_IMPORTED_MODULE_0__.toRefs)(props);

  // =============== METHODS ==============

  const localize = (target) => {
    if (!target || typeof target !== 'object') {
      return target
    }

    if (target && target[locale.value]) {
      return target[locale.value]
    } else if (target && locale.value && target[locale.value.toUpperCase()]) {
      return target[locale.value.toUpperCase()]
    } else if (target && target[fallbackLocale.value]) {
      return target[fallbackLocale.value]
    } else if (target && fallbackLocale.value && target[fallbackLocale.value.toUpperCase()]) {
      return target[fallbackLocale.value.toUpperCase()]
    } else if (target && Object.keys(target)[0]) {
      return target[Object.keys(target)[0]]
    } else {
      return ''
    }
  };

  return {
    localize,
  }
}

function resolveDeps (props, context, features, deps = {}) {
  features.forEach((composable) => {
    /* istanbul ignore else */
    if (composable) {
      deps = {
        ...deps,
        ...composable(props, context, deps)
      };
    }

  });
  
  return deps
}

//

  var script = {
    name: 'Multiselect',
    emits: [
      'paste', 'open', 'close', 'select', 'deselect', 
      'input', 'search-change', 'tag', 'option', 'update:modelValue',
      'change', 'clear', 'keydown', 'keyup', 'max', 'create',
    ],
    props: {
      value: {
        required: false,
      },
      modelValue: {
        required: false,
      },
      options: {
        type: [Array, Object, Function],
        required: false,
        default: () => ([])
      },
      id: {
        type: [String, Number],
        required: false,
      },
      name: {
        type: [String, Number],
        required: false,
        default: 'multiselect',
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
      },
      label: {
        type: String,
        required: false,
        default: 'label',
      },
      trackBy: {
        type: String,
        required: false,
        default: undefined,
      },
      valueProp: {
        type: String,
        required: false,
        default: 'value',
      },
      placeholder: {
        type: String,
        required: false,
        default: null,
      },
      mode: {
        type: String,
        required: false,
        default: 'single', // single|multiple|tags
      },
      searchable: {
        type: Boolean,
        required: false,
        default: false,
      },
      limit: {
        type: Number,
        required: false,
        default: -1,
      },
      hideSelected: {
        type: Boolean,
        required: false,
        default: true,
      },
      createTag: {
        type: Boolean,
        required: false,
        default: undefined,
      },
      createOption: {
        type: Boolean,
        required: false,
        default: undefined,
      },
      appendNewTag: {
        type: Boolean,
        required: false,
        default: undefined,
      },
      appendNewOption: {
        type: Boolean,
        required: false,
        default: undefined,
      },
      addTagOn: {
        type: Array,
        required: false,
        default: undefined,
      },
      addOptionOn: {
        type: Array,
        required: false,
        default: undefined,
      },
      caret: {
        type: Boolean,
        required: false,
        default: true,
      },
      loading: {
        type: Boolean,
        required: false,
        default: false,
      },
      noOptionsText: {
        type: [String, Object],
        required: false,
        default: 'The list is empty',
      },
      noResultsText: {
        type: [String, Object],
        required: false,
        default: 'No results found',
      },
      multipleLabel: {
        type: Function,
        required: false,
      },
      object: {
        type: Boolean,
        required: false,
        default: false,
      },
      delay: {
        type: Number,
        required: false,
        default: -1,
      },
      minChars: {
        type: Number,
        required: false,
        default: 0,
      },
      resolveOnLoad: {
        type: Boolean,
        required: false,
        default: true,
      },
      filterResults: {
        type: Boolean,
        required: false,
        default: true,
      },
      clearOnSearch: {
        type: Boolean,
        required: false,
        default: false,
      },
      clearOnSelect: {
        type: Boolean,
        required: false,
        default: true,
      },
      canDeselect: {
        type: Boolean,
        required: false,
        default: true,
      },
      canClear: {
        type: Boolean,
        required: false,
        default: true,
      },
      max: {
        type: Number,
        required: false,
        default: -1,
      },
      showOptions: {
        type: Boolean,
        required: false,
        default: true,
      },
      required: {
        type: Boolean,
        required: false,
        default: false,
      },
      openDirection: {
        type: String,
        required: false,
        default: 'bottom',
      },
      nativeSupport: {
        type: Boolean,
        required: false,
        default: false,
      },
      classes: {
        type: Object,
        required: false,
        default: () => ({})
      },
      strict: {
        type: Boolean,
        required: false,
        default: true,
      },
      closeOnSelect: {
        type: Boolean,
        required: false,
        default: true,
      },
      closeOnDeselect: {
        type: Boolean,
        required: false,
        default: false,
      },
      autocomplete: {
        type: String,
        required: false,
      },
      groups: {
        type: Boolean,
        required: false,
        default: false,
      },
      groupLabel: {
        type: String,
        required: false,
        default: 'label',
      },
      groupOptions: {
        type: String,
        required: false,
        default: 'options',
      },
      groupHideEmpty: {
        type: Boolean,
        required: false,
        default: false,
      },
      groupSelect: {
        type: Boolean,
        required: false,
        default: true,
      },
      inputType: {
        type: String,
        required: false,
        default: 'text',
      },
      attrs: {
        required: false,
        type: Object,
        default: () => ({}),
      },
      onCreate: {
        required: false,
        type: Function,
      },
      disabledProp: {
        type: String,
        required: false,
        default: 'disabled',
      },
      searchStart: {
        type: Boolean,
        required: false,
        default: false,
      },
      reverse: {
        type: Boolean,
        required: false,
        default: false,
      },
      regex: {
        type: [Object, String, RegExp],
        required: false,
        default: undefined,
      },
      rtl: {
        type: Boolean,
        required: false,
        default: false,
      },
      infinite: {
        type: Boolean,
        required: false,
        default: false,
      },
      aria: {
        required: false,
        type: Object,
        default: () => ({}),
      },
      clearOnBlur: {
        required: false,
        type: Boolean,
        default: true,
      },
      locale: {
        required: false,
        type: String,
        default: null,
      },
      fallbackLocale: {
        required: false,
        type: String,
        default: 'en',
      },
      searchFilter: {
        required: false,
        type: Function,
        default: null,
      },
      allowAbsent: {
        required: false,
        type: Boolean,
        default: false,
      },
    },
    setup(props, context)
    { 
      return resolveDeps(props, context, [
        useI18n,
        useValue,
        usePointer$1,
        useDropdown,
        useSearch,
        useData,
        useMultiselect,
        useOptions,
        useScroll,
        usePointer,
        useKeyboard,
        useClasses,
        useA11y,
      ])
    }
  };

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      ref: "multiselect",
      class: _vm.classList.container,
      attrs: {
        id: _vm.searchable ? undefined : _vm.id,
        dir: _vm.rtl ? "rtl" : undefined,
      },
      on: {
        focusin: _vm.handleFocusIn,
        focusout: _vm.handleFocusOut,
        keyup: _vm.handleKeyup,
        keydown: _vm.handleKeydown,
      },
    },
    [
      _c(
        "div",
        _vm._b(
          {
            ref: "wrapper",
            class: _vm.classList.wrapper,
            attrs: {
              tabindex: _vm.tabindex,
              "aria-controls": !_vm.searchable ? _vm.ariaControls : undefined,
              "aria-placeholder": !_vm.searchable
                ? _vm.ariaPlaceholder
                : undefined,
              "aria-expanded": !_vm.searchable ? _vm.isOpen : undefined,
              "aria-activedescendant": !_vm.searchable
                ? _vm.ariaActiveDescendant
                : undefined,
              "aria-multiselectable": !_vm.searchable
                ? _vm.ariaMultiselectable
                : undefined,
              role: !_vm.searchable ? "combobox" : undefined,
            },
            on: { mousedown: _vm.handleMousedown },
          },
          "div",
          !_vm.searchable ? _vm.arias : {},
          false
        ),
        [
          _vm.mode !== "tags" && _vm.searchable && !_vm.disabled
            ? [
                _c(
                  "input",
                  _vm._b(
                    {
                      ref: "input",
                      class: _vm.classList.search,
                      attrs: {
                        type: _vm.inputType,
                        modelValue: _vm.search,
                        autocomplete: _vm.autocomplete,
                        id: _vm.searchable ? _vm.id : undefined,
                        "aria-controls": _vm.ariaControls,
                        "aria-placeholder": _vm.ariaPlaceholder,
                        "aria-expanded": _vm.isOpen,
                        "aria-activedescendant": _vm.ariaActiveDescendant,
                        "aria-multiselectable": _vm.ariaMultiselectable,
                        role: "combobox",
                      },
                      domProps: { value: _vm.search },
                      on: {
                        input: _vm.handleSearchInput,
                        keypress: _vm.handleKeypress,
                        paste: function ($event) {
                          $event.stopPropagation();
                          return _vm.handlePaste.apply(null, arguments)
                        },
                      },
                    },
                    "input",
                    Object.assign({}, _vm.attrs, _vm.arias),
                    false
                  )
                ),
              ]
            : _vm._e(),
          _vm._v(" "),
          _vm.mode == "tags"
            ? [
                _c(
                  "div",
                  { class: _vm.classList.tags, attrs: { "data-tags": "" } },
                  [
                    _vm._l(_vm.iv, function (option, i, key) {
                      return _vm._t(
                        "tag",
                        function () {
                          return [
                            _c(
                              "span",
                              {
                                key: key,
                                class: [
                                  _vm.classList.tag,
                                  option.disabled
                                    ? _vm.classList.tagDisabled
                                    : null,
                                ],
                                attrs: {
                                  tabindex: "-1",
                                  "aria-label": _vm.ariaTagLabel(
                                    _vm.localize(option[_vm.label])
                                  ),
                                },
                                on: {
                                  keyup: function ($event) {
                                    if (
                                      !$event.type.indexOf("key") &&
                                      _vm._k(
                                        $event.keyCode,
                                        "enter",
                                        13,
                                        $event.key,
                                        "Enter"
                                      )
                                    ) {
                                      return null
                                    }
                                    return _vm.handleTagRemove(option, $event)
                                  },
                                },
                              },
                              [
                                _vm._v(
                                  "\n            " +
                                    _vm._s(_vm.localize(option[_vm.label])) +
                                    "\n            "
                                ),
                                !_vm.disabled && !option.disabled
                                  ? _c(
                                      "span",
                                      {
                                        class: _vm.classList.tagRemove,
                                        on: {
                                          click: function ($event) {
                                            $event.stopPropagation();
                                            return _vm.handleTagRemove(
                                              option,
                                              $event
                                            )
                                          },
                                        },
                                      },
                                      [
                                        _c("span", {
                                          class: _vm.classList.tagRemoveIcon,
                                        }),
                                      ]
                                    )
                                  : _vm._e(),
                              ]
                            ),
                          ]
                        },
                        {
                          option: option,
                          handleTagRemove: _vm.handleTagRemove,
                          disabled: _vm.disabled,
                        }
                      )
                    }),
                    _vm._v(" "),
                    _c(
                      "div",
                      { ref: "tags", class: _vm.classList.tagsSearchWrapper },
                      [
                        _c("span", { class: _vm.classList.tagsSearchCopy }, [
                          _vm._v(_vm._s(_vm.search)),
                        ]),
                        _vm._v(" "),
                        _vm.searchable && !_vm.disabled
                          ? _c(
                              "input",
                              _vm._b(
                                {
                                  ref: "input",
                                  class: _vm.classList.tagsSearch,
                                  attrs: {
                                    type: _vm.inputType,
                                    modelValue: _vm.search,
                                    id: _vm.searchable ? _vm.id : undefined,
                                    autocomplete: _vm.autocomplete,
                                    "aria-controls": _vm.ariaControls,
                                    "aria-placeholder": _vm.ariaPlaceholder,
                                    "aria-expanded": _vm.isOpen,
                                    "aria-activedescendant":
                                      _vm.ariaActiveDescendant,
                                    "aria-multiselectable":
                                      _vm.ariaMultiselectable,
                                    role: "combobox",
                                  },
                                  domProps: { value: _vm.search },
                                  on: {
                                    input: _vm.handleSearchInput,
                                    keypress: _vm.handleKeypress,
                                    paste: function ($event) {
                                      $event.stopPropagation();
                                      return _vm.handlePaste.apply(
                                        null,
                                        arguments
                                      )
                                    },
                                  },
                                },
                                "input",
                                Object.assign({}, _vm.attrs, _vm.arias),
                                false
                              )
                            )
                          : _vm._e(),
                      ]
                    ),
                  ],
                  2
                ),
              ]
            : _vm._e(),
          _vm._v(" "),
          _vm.mode == "single" && _vm.hasSelected && !_vm.search && _vm.iv
            ? [
                _vm._t(
                  "singlelabel",
                  function () {
                    return [
                      _c("div", { class: _vm.classList.singleLabel }, [
                        _c("span", { class: _vm.classList.singleLabelText }, [
                          _vm._v(_vm._s(_vm.localize(_vm.iv[_vm.label]))),
                        ]),
                      ]),
                    ]
                  },
                  { value: _vm.iv }
                ),
              ]
            : _vm._e(),
          _vm._v(" "),
          _vm.mode == "multiple" && _vm.hasSelected && !_vm.search
            ? [
                _vm._t(
                  "multiplelabel",
                  function () {
                    return [
                      _c("div", {
                        class: _vm.classList.multipleLabel,
                        domProps: { innerHTML: _vm._s(_vm.multipleLabelText) },
                      }),
                    ]
                  },
                  { values: _vm.iv }
                ),
              ]
            : _vm._e(),
          _vm._v(" "),
          _vm.placeholder && !_vm.hasSelected && !_vm.search
            ? [
                _vm._t("placeholder", function () {
                  return [
                    _c(
                      "div",
                      {
                        class: _vm.classList.placeholder,
                        attrs: { "aria-hidden": "true" },
                      },
                      [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.placeholder) +
                            "\n        "
                        ),
                      ]
                    ),
                  ]
                }),
              ]
            : _vm._e(),
          _vm._v(" "),
          _vm.loading || _vm.resolving
            ? _vm._t("spinner", function () {
                return [
                  _c("span", {
                    class: _vm.classList.spinner,
                    attrs: { "aria-hidden": "true" },
                  }),
                ]
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.hasSelected && !_vm.disabled && _vm.canClear && !_vm.busy
            ? _vm._t(
                "clear",
                function () {
                  return [
                    _c(
                      "span",
                      {
                        class: _vm.classList.clear,
                        attrs: {
                          "aria-hidden": "true",
                          tabindex: "0",
                          role: "button",
                          "data-clear": "",
                          "aria-roledescription": "❎",
                        },
                        on: {
                          click: _vm.clear,
                          keyup: function ($event) {
                            if (
                              !$event.type.indexOf("key") &&
                              _vm._k(
                                $event.keyCode,
                                "enter",
                                13,
                                $event.key,
                                "Enter"
                              )
                            ) {
                              return null
                            }
                            return _vm.clear.apply(null, arguments)
                          },
                        },
                      },
                      [_c("span", { class: _vm.classList.clearIcon })]
                    ),
                  ]
                },
                { clear: _vm.clear }
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.caret && _vm.showOptions
            ? _vm._t("caret", function () {
                return [
                  _c("span", {
                    class: _vm.classList.caret,
                    attrs: { "aria-hidden": "true" },
                    on: { click: _vm.handleCaretClick },
                  }),
                ]
              })
            : _vm._e(),
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "div",
        { class: _vm.classList.dropdown, attrs: { tabindex: "-1" } },
        [
          _vm._t("beforelist", null, { options: _vm.fo }),
          _vm._v(" "),
          _c(
            "ul",
            {
              class: _vm.classList.options,
              attrs: { id: _vm.ariaControls, role: "listbox" },
            },
            [
              _vm.groups
                ? _vm._l(_vm.fg, function (group, i, key) {
                    return _c(
                      "li",
                      {
                        key: key,
                        class: _vm.classList.group,
                        attrs: {
                          id: _vm.ariaGroupId(group),
                          "aria-label": _vm.ariaGroupLabel(
                            _vm.localize(group[_vm.groupLabel])
                          ),
                          "aria-selected": _vm.isSelected(group),
                          role: "option",
                        },
                      },
                      [
                        !group.__CREATE__
                          ? _c(
                              "div",
                              {
                                class: _vm.classList.groupLabel(group),
                                attrs: { "data-pointed": _vm.isPointed(group) },
                                on: {
                                  mouseenter: function ($event) {
                                    return _vm.setPointer(group, i)
                                  },
                                  click: function ($event) {
                                    return _vm.handleGroupClick(group)
                                  },
                                },
                              },
                              [
                                _vm._t(
                                  "grouplabel",
                                  function () {
                                    return [
                                      _c("span", {
                                        domProps: {
                                          innerHTML: _vm._s(
                                            _vm.localize(group[_vm.groupLabel])
                                          ),
                                        },
                                      }),
                                    ]
                                  },
                                  {
                                    group: group,
                                    isSelected: _vm.isSelected,
                                    isPointed: _vm.isPointed,
                                  }
                                ),
                              ],
                              2
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "ul",
                          {
                            class: _vm.classList.groupOptions,
                            attrs: {
                              "aria-label": _vm.ariaGroupLabel(
                                _vm.localize(group[_vm.groupLabel])
                              ),
                              role: "group",
                            },
                          },
                          _vm._l(group.__VISIBLE__, function (option, i, key) {
                            return _c(
                              "li",
                              {
                                key: key,
                                class: _vm.classList.option(option, group),
                                attrs: {
                                  "data-pointed": _vm.isPointed(option),
                                  "data-selected":
                                    _vm.isSelected(option) || undefined,
                                  id: _vm.ariaOptionId(option),
                                  "aria-selected": _vm.isSelected(option),
                                  "aria-label": _vm.ariaOptionLabel(
                                    _vm.localize(option[_vm.label])
                                  ),
                                  role: "option",
                                },
                                on: {
                                  mouseenter: function ($event) {
                                    return _vm.setPointer(option)
                                  },
                                  click: function ($event) {
                                    return _vm.handleOptionClick(option)
                                  },
                                },
                              },
                              [
                                _vm._t(
                                  "option",
                                  function () {
                                    return [
                                      _c("span", [
                                        _vm._v(
                                          _vm._s(
                                            _vm.localize(option[_vm.label])
                                          )
                                        ),
                                      ]),
                                    ]
                                  },
                                  {
                                    option: option,
                                    isSelected: _vm.isSelected,
                                    isPointed: _vm.isPointed,
                                    search: _vm.search,
                                  }
                                ),
                              ],
                              2
                            )
                          }),
                          0
                        ),
                      ]
                    )
                  })
                : _vm._l(_vm.fo, function (option, i, key) {
                    return _c(
                      "li",
                      {
                        key: key,
                        class: _vm.classList.option(option),
                        attrs: {
                          "data-pointed": _vm.isPointed(option),
                          "data-selected": _vm.isSelected(option) || undefined,
                          id: _vm.ariaOptionId(option),
                          "aria-selected": _vm.isSelected(option),
                          "aria-label": _vm.ariaOptionLabel(
                            _vm.localize(option[_vm.label])
                          ),
                          role: "option",
                        },
                        on: {
                          mouseenter: function ($event) {
                            return _vm.setPointer(option)
                          },
                          click: function ($event) {
                            return _vm.handleOptionClick(option)
                          },
                        },
                      },
                      [
                        _vm._t(
                          "option",
                          function () {
                            return [
                              _c("span", [
                                _vm._v(_vm._s(_vm.localize(option[_vm.label]))),
                              ]),
                            ]
                          },
                          {
                            option: option,
                            isSelected: _vm.isSelected,
                            isPointed: _vm.isPointed,
                            search: _vm.search,
                          }
                        ),
                      ],
                      2
                    )
                  }),
            ],
            2
          ),
          _vm._v(" "),
          _vm.noOptions
            ? _vm._t("nooptions", function () {
                return [
                  _c("div", {
                    class: _vm.classList.noOptions,
                    domProps: {
                      innerHTML: _vm._s(_vm.localize(_vm.noOptionsText)),
                    },
                  }),
                ]
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.noResults
            ? _vm._t("noresults", function () {
                return [
                  _c("div", {
                    class: _vm.classList.noResults,
                    domProps: {
                      innerHTML: _vm._s(_vm.localize(_vm.noResultsText)),
                    },
                  }),
                ]
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.infinite && _vm.hasMore
            ? _c(
                "div",
                { ref: "infiniteLoader", class: _vm.classList.inifinite },
                [
                  _vm._t("infinite", function () {
                    return [
                      _c("span", { class: _vm.classList.inifiniteSpinner }),
                    ]
                  }),
                ],
                2
              )
            : _vm._e(),
          _vm._v(" "),
          _vm._t("afterlist", null, { options: _vm.fo }),
        ],
        2
      ),
      _vm._v(" "),
      _vm.required
        ? _c("input", {
            class: _vm.classList.fakeInput,
            attrs: { tabindex: "-1", required: "" },
            domProps: { value: _vm.textValue },
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.nativeSupport
        ? [
            _vm.mode == "single"
              ? _c("input", {
                  attrs: { type: "hidden", name: _vm.name },
                  domProps: {
                    value: _vm.plainValue !== undefined ? _vm.plainValue : "",
                  },
                })
              : _vm._l(_vm.plainValue, function (v, i) {
                  return _c("input", {
                    key: i,
                    attrs: { type: "hidden", name: _vm.name + "[]" },
                    domProps: { value: v },
                  })
                }),
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.searchable && _vm.hasSelected
        ? _c(
            "div",
            {
              class: _vm.classList.assist,
              attrs: { id: _vm.ariaAssist, "aria-hidden": "true" },
            },
            [_vm._v("\n    " + _vm._s(_vm.ariaLabel) + "\n  ")]
          )
        : _vm._e(),
      _vm._v(" "),
      _c("div", { class: _vm.classList.spacer }),
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );




/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Alert.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Alert.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Alert",
  props: {
    dismissible: {
      type: Boolean,
      "default": true
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Icon.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Icon.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    name: String
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/LanguageSelector.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/LanguageSelector.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _inertiajs_inertia_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @inertiajs/inertia-vue */ "./node_modules/@inertiajs/inertia-vue/dist/index.js");
/* harmony import */ var _Components_Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Components/Icon */ "./resources/js/Components/Icon.vue");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Icon: _Components_Icon__WEBPACK_IMPORTED_MODULE_1__["default"],
    Link: _inertiajs_inertia_vue__WEBPACK_IMPORTED_MODULE_0__.Link
  },
  props: {},
  computed: {
    selectable_locale: function selectable_locale() {
      return this.$page.props.locale;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/ContentHeader.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/ContentHeader.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    name: name
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/DashFooter.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/DashFooter.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      year: new Date().getFullYear()
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Header.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Header.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Components_Layout_UserMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/Components/Layout/UserMenu */ "./resources/js/Components/Layout/UserMenu.vue");
/* harmony import */ var _Components_LanguageSelector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Components/LanguageSelector */ "./resources/js/Components/LanguageSelector.vue");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    UserMenu: _Components_Layout_UserMenu__WEBPACK_IMPORTED_MODULE_0__["default"],
    Language: _Components_LanguageSelector__WEBPACK_IMPORTED_MODULE_1__["default"]
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Layout.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Layout.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Components_Layout_DashFooter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/Components/Layout/DashFooter */ "./resources/js/Components/Layout/DashFooter.vue");
/* harmony import */ var _Components_Layout_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Components/Layout/Header */ "./resources/js/Components/Layout/Header.vue");
/* harmony import */ var _Components_Layout_Menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Components/Layout/Menu */ "./resources/js/Components/Layout/Menu.vue");
/* harmony import */ var _Components_Layout_SiderBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Components/Layout/SiderBar */ "./resources/js/Components/Layout/SiderBar.vue");
/* harmony import */ var _Components_Layout_UserMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Components/Layout/UserMenu */ "./resources/js/Components/Layout/UserMenu.vue");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../config */ "./resources/js/config/index.js");
/* harmony import */ var hideseek__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! hideseek */ "./node_modules/hideseek/jquery.hideseek.js");
/* harmony import */ var hideseek__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(hideseek__WEBPACK_IMPORTED_MODULE_6__);







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    DashFooter: _Components_Layout_DashFooter__WEBPACK_IMPORTED_MODULE_0__["default"],
    Header: _Components_Layout_Header__WEBPACK_IMPORTED_MODULE_1__["default"],
    Menu: _Components_Layout_Menu__WEBPACK_IMPORTED_MODULE_2__["default"],
    SiderBar: _Components_Layout_SiderBar__WEBPACK_IMPORTED_MODULE_3__["default"],
    UserMenu: _Components_Layout_UserMenu__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  data: function data() {
    return {
      // section: 'Dash',
      classes: {
        fixed_layout: _config__WEBPACK_IMPORTED_MODULE_5__["default"].fixedLayout,
        hide_logo: _config__WEBPACK_IMPORTED_MODULE_5__["default"].hideLogoOnMobile
      }
    };
  },
  mounted: function mounted() {
    this.listenNotificationGroup();
    this.listenNotificationDevice();
  },
  methods: {
    listenNotificationGroup: function listenNotificationGroup() {
      var _this = this;

      this.sockets.subscribe("time-play-notification.".concat(this.$page.props.auth.user.id, ":App\\Events\\TimeEndGroupNotification"), function (data) {
        console.log(data);

        _this.$swal("Group ".concat(data.group_name, " Timer Ends"), {
          icon: "warning",
          timer: 60000
        });
      });
    },
    listenNotificationDevice: function listenNotificationDevice() {
      var _this2 = this;

      console.log(this.user.id);

      if (this.user) {
        this.sockets.subscribe("time-end-device.".concat(this.$page.props.auth.user.id, ":App\\Events\\TimeEndDeviceNotification"), function (data) {
          console.log(data);

          _this2.$swal("Device ".concat(data.device_name, " Timer Ends"), {
            icon: "warning",
            timer: 60000
          });
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Menu.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Menu.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _inertiajs_inertia_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @inertiajs/inertia-vue */ "./node_modules/@inertiajs/inertia-vue/dist/index.js");
/* harmony import */ var _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/inertia */ "./node_modules/@inertiajs/inertia/dist/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Link: _inertiajs_inertia_vue__WEBPACK_IMPORTED_MODULE_0__.Link
  },
  mounted: function mounted() {
    _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_1__.Inertia.on('navigate', function (event) {
      $('body').removeClass('sidebar-open');
      console.log("Navigated to ".concat(event.detail.page.url));
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/SiderBar.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/SiderBar.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Components_Layout_Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/Components/Layout/Menu */ "./resources/js/Components/Layout/Menu.vue");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Menu: _Components_Layout_Menu__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  mounted: function mounted() {
    $('[data-toggle="hideseek"]').off().hideseek();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/UserMenu.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/UserMenu.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _inertiajs_inertia_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @inertiajs/inertia-vue */ "./node_modules/@inertiajs/inertia-vue/dist/index.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Link: _inertiajs_inertia_vue__WEBPACK_IMPORTED_MODULE_0__.Link
  },
  methods: {
    logout: function logout() {
      this.$inertia.post(route("logout"));
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Pagination.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Pagination.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _inertiajs_inertia_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @inertiajs/inertia-vue */ "./node_modules/@inertiajs/inertia-vue/dist/index.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Link: _inertiajs_inertia_vue__WEBPACK_IMPORTED_MODULE_0__.Link
  },
  props: {
    links: Array
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/ImportModal.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/ImportModal.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    errors: Object
  },
  data: function data() {
    return {
      term: null,
      form: this.$inertia.form({
        check: 'us'
      })
    };
  },
  methods: _defineProperty({
    clickModal: function clickModal() {},
    save: function save() {
      var _this = this;

      this.form.post(route("users.import"), {
        preserveState: true,
        onError: function onError(errors) {
          if (Object.keys(errors).length > 0) {}
        },
        onSuccess: function onSuccess(page) {
          $("#importModal").modal("hide");

          _this.reset();
        }
      });
    },
    reset: function reset() {
      this.form = this.$inertia.form({
        check: 'us'
      });
    }
  }, "clickModal", function clickModal() {
    this.reset();
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/UpdateUser.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/UpdateUser.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    errors: Object
  },
  data: function data() {
    return {
      term: null,
      form: this.$inertia.form({
        check: 'us'
      })
    };
  },
  methods: _defineProperty({
    clickModal: function clickModal() {},
    save: function save() {
      var _this = this;

      this.form.post(route("users.update-users"), {
        preserveState: true,
        onError: function onError(errors) {
          if (Object.keys(errors).length > 0) {}
        },
        onSuccess: function onSuccess(page) {
          $("#updateAllModal").modal("hide");

          _this.reset();
        }
      });
    },
    reset: function reset() {
      this.form = this.$inertia.form({
        check: 'us'
      });
    }
  }, "clickModal", function clickModal() {
    this.reset();
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/User.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/User.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _inertiajs_inertia_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @inertiajs/inertia-vue */ "./node_modules/@inertiajs/inertia-vue/dist/index.js");
/* harmony import */ var _Components_Layout_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Components/Layout/Layout */ "./resources/js/Components/Layout/Layout.vue");
/* harmony import */ var _Components_Layout_ContentHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Components/Layout/ContentHeader */ "./resources/js/Components/Layout/ContentHeader.vue");
/* harmony import */ var _Components_Pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Components/Pagination */ "./resources/js/Components/Pagination.vue");
/* harmony import */ var _Components_Alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Components/Alert */ "./resources/js/Components/Alert.vue");
/* harmony import */ var _vueform_multiselect_dist_multiselect_vue2_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vueform/multiselect/dist/multiselect.vue2.js */ "./node_modules/@vueform/multiselect/dist/multiselect.vue2.js");
/* harmony import */ var _Pages_Admin_ImportModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/Pages/Admin/ImportModal */ "./resources/js/Pages/Admin/ImportModal.vue");
/* harmony import */ var _Pages_Admin_UpdateUser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/Pages/Admin/UpdateUser */ "./resources/js/Pages/Admin/UpdateUser.vue");
/* harmony import */ var _mixins_admin__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mixins/admin */ "./resources/js/Pages/Admin/mixins/admin.js");
/* harmony import */ var process__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! process */ "./node_modules/process/browser.js");
/* harmony import */ var process__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(process__WEBPACK_IMPORTED_MODULE_9__);
var _methods;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  layout: _Components_Layout_Layout__WEBPACK_IMPORTED_MODULE_1__["default"],
  mixins: [_mixins_admin__WEBPACK_IMPORTED_MODULE_8__["default"]],
  props: {
    users: Object,
    roles: Array,
    errors: Object
  },
  components: {
    Link: _inertiajs_inertia_vue__WEBPACK_IMPORTED_MODULE_0__.Link,
    ContentHeaderVue: _Components_Layout_ContentHeader__WEBPACK_IMPORTED_MODULE_2__["default"],
    Pagination: _Components_Pagination__WEBPACK_IMPORTED_MODULE_3__["default"],
    Alert: _Components_Alert__WEBPACK_IMPORTED_MODULE_4__["default"],
    Multiselect: _vueform_multiselect_dist_multiselect_vue2_js__WEBPACK_IMPORTED_MODULE_5__["default"],
    ImportModal: _Pages_Admin_ImportModal__WEBPACK_IMPORTED_MODULE_6__["default"],
    UpdateUser: _Pages_Admin_UpdateUser__WEBPACK_IMPORTED_MODULE_7__["default"]
  },
  data: function data() {
    return {
      term: null,
      editMode: false,
      filter: 0,
      form: this.$inertia.form({
        id: null,
        name: null,
        phone: null,
        email: null,
        roles: null,
        password: null,
        time_limit: null,
        number_device: null
      })
    };
  },
  methods: (_methods = {
    search: function search() {
      this.$inertia.get(this.route("users.index"), {
        term: this.term
      }, {
        preserveState: true
      });
    },
    Filter: function Filter(event) {
      this.filter = event.target.value;
      var query = {
        filter: this.filter,
        term: this.term,
        answered: this.answered
      };
      this.$inertia.get(this.route("users.index"), query, {
        preserveState: true
      });
    },
    clickModal: function clickModal() {},
    save: function save() {
      var _this = this;

      if (this.editMode) {
        this.form.put(route("users.update", this.form.id), {
          preserveState: true,
          onError: function onError(errors) {
            if (Object.keys(errors).length > 0) {
              _this.editMode = true;
            }
          },
          onSuccess: function onSuccess(page) {
            $("#exampleModal").modal("hide");

            _this.reset();
          }
        });
      } else {
        this.form.post(route("users.store"), {
          preserveState: true,
          onError: function onError(errors) {
            if (Object.keys(errors).length > 0) {
              _this.editMode = false;
            }
          },
          onSuccess: function onSuccess(page) {
            $("#exampleModal").modal("hide");

            _this.reset();
          }
        });
      }
    },
    reset: function reset() {
      this.form = this.$inertia.form({
        id: null,
        name: null,
        phone: null,
        email: null,
        roles: null,
        time_limit: null,
        password: null,
        number_device: null
      });
    }
  }, _defineProperty(_methods, "clickModal", function clickModal() {
    this.editMode = false;
    this.reset();
  }), _defineProperty(_methods, "edit", function edit(data) {
    this.editMode = true;
    this.form.id = data.id;
    this.form.name = data.name;
    this.form.phone = data.phone;
    this.form.email = data.email;
    this.form.time_limit = data.time_limit;
    this.form.number_device = data.number_device;
    this.form.password = data.password; //trả về một biến array chưa id của permission
    // this.form = Object.assign({}, data);

    this.form.roles = this.multipleSelect(data.roles);
    this.editMode = true;
  }), _defineProperty(_methods, "deleteRow", function deleteRow(id) {
    if (!confirm("Are you sure want to remove?")) return;
    this.$inertia["delete"](route("users.destroy", id));
  }), _methods)
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Alert.vue?vue&type=template&id=f21dafbe&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Alert.vue?vue&type=template&id=f21dafbe& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _vm.$page.props.flash.warning || Object.keys(_vm.$page.props.errors).length > 0 ? _c("div", {
    "class": ["alert", "alert-" + "error", {
      "alert-dismissible": _vm.dismissible
    }]
  }, [_vm.dismissible ? _c("button", {
    staticClass: "close",
    attrs: {
      type: "button",
      "data-dismiss": "alert",
      "aria-hidden": "true"
    }
  }, [_vm._v("×")]) : _vm._e(), _vm._v(" "), _c("h4", [Object.keys(_vm.$page.props.errors).length > 0 ? _c("i", {
    staticClass: "fa fa-warning"
  }) : _vm._e(), _vm._v(" "), Object.keys(_vm.$page.props.errors).length > 0 ? _c("span", [_vm._v("There are " + _vm._s(Object.keys(_vm.$page.props.errors).length) + " form errors.")]) : _vm._e(), _vm._v(" "), _vm.$page.props.flash.warning ? _c("i", {
    staticClass: "fa fa-warning"
  }) : _vm._e(), _vm._v(" "), _vm.$page.props.flash.warning ? _c("span", [_vm._v(_vm._s(_vm.$page.props.flash.warning))]) : _vm._e()]), _vm._v(" "), _c("span", [_vm._t("default")], 2)]) : _vm.$page.props.flash.success ? _c("div", {
    "class": ["alert", "alert-" + "success", {
      "alert-dismissible": _vm.dismissible
    }]
  }, [_vm.dismissible ? _c("button", {
    staticClass: "close",
    attrs: {
      type: "button",
      "data-dismiss": "alert",
      "aria-hidden": "true"
    }
  }, [_vm._v("×")]) : _vm._e(), _vm._v(" "), _c("h4", [_c("i", {
    staticClass: "fa fa-check"
  }), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.$page.props.flash.success))])]), _vm._v(" "), _c("span", [_vm._t("default")], 2)]) : _vm._e();
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Icon.vue?vue&type=template&id=7b50d278&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Icon.vue?vue&type=template&id=7b50d278& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _vm.name === "apple" ? _c("svg", {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      width: "100",
      height: "100",
      viewBox: "0 0 100 100"
    }
  }, [_c("g", {
    attrs: {
      "fill-rule": "nonzero"
    }
  }, [_c("path", {
    attrs: {
      d: "M46.173 19.967C49.927-1.838 19.797-.233 14.538.21c-.429.035-.648.4-.483.8 2.004 4.825 14.168 31.66 32.118 18.957zm13.18 1.636c1.269-.891 1.35-1.614.047-2.453l-2.657-1.71c-.94-.607-1.685-.606-2.532.129-5.094 4.42-7.336 9.18-8.211 15.24 1.597.682 3.55.79 5.265.328 1.298-4.283 3.64-8.412 8.088-11.534z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "M88.588 67.75c9.65-27.532-13.697-45.537-35.453-32.322-1.84 1.118-4.601 1.118-6.441 0-21.757-13.215-45.105 4.79-35.454 32.321 5.302 15.123 17.06 39.95 37.295 29.995.772-.38 1.986-.38 2.758 0 20.235 9.955 31.991-14.872 37.295-29.995z"
    }
  })])]) : _vm.name === "book" ? _c("svg", {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20"
    }
  }, [_c("path", {
    attrs: {
      d: "M6 4H5a1 1 0 1 1 0-2h11V1a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V5a1 1 0 0 0-1-1h-7v8l-2-2-2 2V4z"
    }
  })]) : _vm.name === "cheveron-down" ? _c("svg", {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20"
    }
  }, [_c("path", {
    attrs: {
      d: "M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
    }
  })]) : _vm.name === "cheveron-right" ? _c("svg", {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20"
    }
  }, [_c("polygon", {
    attrs: {
      points: "12.95 10.707 13.657 10 8 4.343 6.586 5.757 10.828 10 6.586 14.243 8 15.657 12.95 10.707"
    }
  })]) : _vm.name === "dashboard" ? _c("svg", {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20"
    }
  }, [_c("path", {
    attrs: {
      d: "M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-5.6-4.29a9.95 9.95 0 0 1 11.2 0 8 8 0 1 0-11.2 0zm6.12-7.64l3.02-3.02 1.41 1.41-3.02 3.02a2 2 0 1 1-1.41-1.41z"
    }
  })]) : _vm.name === "location" ? _c("svg", {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20"
    }
  }, [_c("path", {
    attrs: {
      d: "M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
    }
  })]) : _vm.name === "office" ? _c("svg", {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      width: "100",
      height: "100",
      viewBox: "0 0 100 100"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M7 0h86v100H57.108V88.418H42.892V100H7V0zm9 64h11v15H16V64zm57 0h11v15H73V64zm-19 0h11v15H54V64zm-19 0h11v15H35V64zM16 37h11v15H16V37zm57 0h11v15H73V37zm-19 0h11v15H54V37zm-19 0h11v15H35V37zM16 11h11v15H16V11zm57 0h11v15H73V11zm-19 0h11v15H54V11zm-19 0h11v15H35V11z"
    }
  })]) : _vm.name === "printer" ? _c("svg", {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20"
    }
  }, [_c("path", {
    attrs: {
      d: "M4 16H0V6h20v10h-4v4H4v-4zm2-4v6h8v-6H6zM4 0h12v5H4V0zM2 8v2h2V8H2zm4 0v2h2V8H6z"
    }
  })]) : _vm.name === "shopping-cart" ? _c("svg", {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20"
    }
  }, [_c("path", {
    attrs: {
      d: "M4 2h16l-3 9H4a1 1 0 1 0 0 2h13v2H4a3 3 0 0 1 0-6h.33L3 5 2 2H0V0h3a1 1 0 0 1 1 1v1zm1 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm10 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
    }
  })]) : _vm.name === "store-front" ? _c("svg", {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20"
    }
  }, [_c("path", {
    attrs: {
      d: "M18 9.87V20H2V9.87a4.25 4.25 0 0 0 3-.38V14h10V9.5a4.26 4.26 0 0 0 3 .37zM3 0h4l-.67 6.03A3.43 3.43 0 0 1 3 9C1.34 9 .42 7.73.95 6.15L3 0zm5 0h4l.7 6.3c.17 1.5-.91 2.7-2.42 2.7h-.56A2.38 2.38 0 0 1 7.3 6.3L8 0zm5 0h4l2.05 6.15C19.58 7.73 18.65 9 17 9a3.42 3.42 0 0 1-3.33-2.97L13 0z"
    }
  })]) : _vm.name === "trash" ? _c("svg", {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20"
    }
  }, [_c("path", {
    attrs: {
      d: "M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"
    }
  })]) : _vm.name === "users" ? _c("svg", {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20"
    }
  }, [_c("path", {
    attrs: {
      d: "M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z"
    }
  })]) : _vm.name === "tour" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      d: "M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
    }
  })]) : _vm.name === "scan" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      d: "M18 12H6"
    }
  })]) : _vm.name === "dropdown" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      d: "M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
    }
  })]) : _vm.name === "logout" ? _c("svg", {
    staticClass: "h-6 w-6",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    }
  })]) : _vm.name === "history_account" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      d: "M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
    }
  })]) : _vm.name === "customer" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      d: "M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
    }
  })]) : _vm.name === "en" ? _c("svg", {
    attrs: {
      "enable-background": "new 0 0 512 512",
      version: "1.1",
      viewBox: "0 0 512 512",
      "xml:space": "preserve",
      xmlns: "http://www.w3.org/2000/svg"
    }
  }, [_c("circle", {
    attrs: {
      cx: "256",
      cy: "256",
      r: "256",
      fill: "#F0F0F0"
    }
  }), _c("g", {
    attrs: {
      fill: "#0052B4"
    }
  }, [_c("path", {
    attrs: {
      d: "m52.92 100.14c-20.109 26.163-35.272 56.318-44.101 89.077h133.18l-89.077-89.077z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "m503.18 189.22c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075 89.076h133.18z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "m8.819 322.78c8.83 32.758 23.993 62.913 44.101 89.075l89.074-89.075h-133.18z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "m411.86 52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.18l89.076-89.075z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "m100.14 459.08c26.163 20.109 56.318 35.272 89.076 44.102v-133.18l-89.076 89.074z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "M189.217,8.819c-32.758,8.83-62.913,23.993-89.075,44.101l89.075,89.075V8.819z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "m322.78 503.18c32.758-8.83 62.913-23.993 89.075-44.101l-89.075-89.075v133.18z"
    }
  }), _c("path", {
    attrs: {
      d: "m370 322.78l89.075 89.076c20.108-26.162 35.272-56.318 44.101-89.076h-133.18z"
    }
  })]), _c("g", {
    attrs: {
      fill: "#D80027"
    }
  }, [_c("path", {
    attrs: {
      d: "m509.83 222.61h-220.44v-220.44c-10.931-1.423-22.075-2.167-33.392-2.167-11.319 0-22.461 0.744-33.391 2.167v220.44h-220.44c-1.423 10.931-2.167 22.075-2.167 33.392 0 11.319 0.744 22.461 2.167 33.391h220.44v220.44c10.931 1.423 22.073 2.167 33.392 2.167 11.317 0 22.461-0.743 33.391-2.167v-220.44h220.44c1.423-10.931 2.167-22.073 2.167-33.392 0-11.317-0.744-22.461-2.167-33.391z"
    }
  }), _c("path", {
    attrs: {
      d: "m322.78 322.78l114.24 114.24c5.254-5.252 10.266-10.743 15.048-16.435l-97.802-97.802h-31.482v1e-3z"
    }
  }), _c("path", {
    attrs: {
      d: "m189.22 322.78h-2e-3l-114.24 114.24c5.252 5.254 10.743 10.266 16.435 15.048l97.802-97.804v-31.479z"
    }
  }), _c("path", {
    attrs: {
      d: "m189.22 189.22v-2e-3l-114.24-114.24c-5.254 5.252-10.266 10.743-15.048 16.435l97.803 97.803h31.481z"
    }
  }), _c("path", {
    attrs: {
      d: "m322.78 189.22l114.24-114.24c-5.252-5.254-10.743-10.266-16.435-15.047l-97.802 97.803v31.482z"
    }
  })])]) : _vm.name === "de" ? _c("svg", {
    attrs: {
      "enable-background": "new 0 0 512 512",
      version: "1.1",
      viewBox: "0 0 512 512",
      "xml:space": "preserve",
      xmlns: "http://www.w3.org/2000/svg"
    }
  }, [_c("path", {
    attrs: {
      d: "M15.923,345.043C52.094,442.527,145.929,512,256,512s203.906-69.473,240.077-166.957L256,322.783  L15.923,345.043z",
      fill: "#FFDA44"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "M256,0C145.929,0,52.094,69.472,15.923,166.957L256,189.217l240.077-22.261C459.906,69.472,366.071,0,256,0z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "M15.923,166.957C5.633,194.69,0,224.686,0,256s5.633,61.31,15.923,89.043h480.155  C506.368,317.31,512,287.314,512,256s-5.632-61.31-15.923-89.043H15.923z",
      fill: "#D80027"
    }
  })]) : _vm.name === "vi" ? _c("svg", {
    staticStyle: {
      "enable-background": "new 0 0 512 512"
    },
    attrs: {
      version: "1.1",
      id: "Layer_1",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      x: "0px",
      y: "0px",
      viewBox: "0 0 512 512",
      "xml:space": "preserve"
    }
  }, [_c("circle", {
    staticStyle: {
      fill: "#D80027"
    },
    attrs: {
      cx: "256",
      cy: "256",
      r: "256"
    }
  }), _vm._v(" "), _c("polygon", {
    staticStyle: {
      fill: "#FFDA44"
    },
    attrs: {
      points: "256,133.565 283.628,218.594 373.033,218.594 300.702,271.144 328.33,356.174 256,303.623 \n    183.67,356.174 211.298,271.144 138.968,218.594 228.372,218.594 "
    }
  }), _vm._v(" "), _c("g"), _vm._v(" "), _c("g"), _vm._v(" "), _c("g"), _vm._v(" "), _c("g"), _vm._v(" "), _c("g"), _vm._v(" "), _c("g"), _vm._v(" "), _c("g"), _vm._v(" "), _c("g"), _vm._v(" "), _c("g"), _vm._v(" "), _c("g"), _vm._v(" "), _c("g"), _vm._v(" "), _c("g"), _vm._v(" "), _c("g"), _vm._v(" "), _c("g"), _vm._v(" "), _c("g")]) : _vm.name === "mail" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      d: "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
    }
  })]) : _vm.name === "cateory" ? _c("svg", {
    attrs: {
      id: "outline",
      height: "512",
      viewBox: "0 0 512 512",
      width: "512",
      xmlns: "http://www.w3.org/2000/svg"
    }
  }, [_c("path", {
    attrs: {
      d: "m472 16h-432a24.0275 24.0275 0 0 0 -24 24v432a24.0275 24.0275 0 0 0 24 24h432a24.0275 24.0275 0 0 0 24-24v-432a24.0275 24.0275 0 0 0 -24-24zm8 456a8.00917 8.00917 0 0 1 -8 8h-432a8.00917 8.00917 0 0 1 -8-8v-432a8.00917 8.00917 0 0 1 8-8h432a8.00917 8.00917 0 0 1 8 8z"
    }
  }), _c("circle", {
    attrs: {
      cx: "56",
      cy: "56",
      r: "8"
    }
  }), _c("circle", {
    attrs: {
      cx: "80",
      cy: "56",
      r: "8"
    }
  }), _c("circle", {
    attrs: {
      cx: "104",
      cy: "56",
      r: "8"
    }
  }), _c("path", {
    attrs: {
      d: "m248 216h-32a7.99977 7.99977 0 0 0 -8 8v32a7.99977 7.99977 0 0 0 8 8h32a7.99977 7.99977 0 0 0 8-8v-32a7.99977 7.99977 0 0 0 -8-8zm-8 32h-16v-16h16z"
    }
  }), _c("path", {
    attrs: {
      d: "m280 232h24v16h-24z"
    }
  }), _c("path", {
    attrs: {
      d: "m320 232h112v16h-112z"
    }
  }), _c("path", {
    attrs: {
      d: "m248 280h-32a7.99977 7.99977 0 0 0 -8 8v32a7.99977 7.99977 0 0 0 8 8h32a7.99977 7.99977 0 0 0 8-8v-32a7.99977 7.99977 0 0 0 -8-8zm-8 32h-16v-16h16z"
    }
  }), _c("path", {
    attrs: {
      d: "m280 296h24v16h-24z"
    }
  }), _c("path", {
    attrs: {
      d: "m320 296h112v16h-112z"
    }
  }), _c("path", {
    attrs: {
      d: "m248 344h-32a7.99977 7.99977 0 0 0 -8 8v32a7.99977 7.99977 0 0 0 8 8h32a7.99977 7.99977 0 0 0 8-8v-32a7.99977 7.99977 0 0 0 -8-8zm-8 32h-16v-16h16z"
    }
  }), _c("path", {
    attrs: {
      d: "m280 360h24v16h-24z"
    }
  }), _c("path", {
    attrs: {
      d: "m320 360h112v16h-112z"
    }
  }), _c("path", {
    attrs: {
      d: "m248 408h-32a7.99977 7.99977 0 0 0 -8 8v32a7.99977 7.99977 0 0 0 8 8h32a7.99977 7.99977 0 0 0 8-8v-32a7.99977 7.99977 0 0 0 -8-8zm-8 32h-16v-16h16z"
    }
  }), _c("path", {
    attrs: {
      d: "m280 424h24v16h-24z"
    }
  }), _c("path", {
    attrs: {
      d: "m320 424h112v16h-112z"
    }
  }), _c("path", {
    attrs: {
      d: "m448 96h-384a7.99977 7.99977 0 0 0 -8 8v344a7.99977 7.99977 0 0 0 8 8h112a7.99977 7.99977 0 0 0 8-8v-256h264a7.99977 7.99977 0 0 0 8-8v-80a7.99977 7.99977 0 0 0 -8-8zm-280 344h-96v-248h96zm272-264h-368v-64h368z"
    }
  })]) : _vm.name === "videos" ? _c("svg", {
    attrs: {
      height: "512pt",
      viewBox: "-31 0 512 512",
      width: "512pt",
      xmlns: "http://www.w3.org/2000/svg"
    }
  }, [_c("g", {
    attrs: {
      "fill-rule": "evenodd"
    }
  }, [_c("path", {
    attrs: {
      d: "m440.589844 206.675781h-341.171875l327.699219-94.929687c2.546874-.738282 4.695312-2.460938 5.976562-4.78125 1.28125-2.324219 1.585938-5.058594.847656-7.605469l-17.148437-59.199219c-6.851563-23.644531-28.867188-40.160156-53.539063-40.160156-5.199218 0-10.378906.738281-15.402344 2.191406l-307.675781 89.128906c-14.230469 4.121094-26.023437 13.582032-33.214843 26.632813-7.1875 13.050781-8.875 28.078125-4.753907 42.304687l16.753907 57.835938v238.253906c0 30.6875 24.964843 55.652344 55.648437 55.652344h120.164063c5.523437 0 10-4.476562 10-10s-4.476563-10-10-10h-120.160157c-19.660156 0-35.652343-15.992188-35.652343-35.652344v-136.085937h51.230468.023438.019531 78.3125.023437.023438 78.3125.023438.023437 78.3125.023437.019532 105.28125v136.085937c0 19.660156-15.992188 35.652344-35.652344 35.652344h-120.164062c-5.519532 0-10 4.476562-10 10s4.480468 10 10 10h120.164062c30.6875 0 55.652344-24.964844 55.652344-55.652344v-239.671875c0-5.523437-4.476563-10-10-10zm-176.332032 93.585938 42.488282-73.585938h55.261718l-42.484374 73.585938zm-78.359374 0 42.488281-73.585938h55.261719l-42.484376 73.585938zm-78.355469 0 42.484375-73.585938h55.265625l-42.488281 73.585938zm37.179687-129.457031-71.148437-68.335938 53.308593-15.441406c.375.546875.8125 1.0625 1.3125 1.542968l71.148438 68.335938-53.308594 15.441406c-.375-.546875-.816406-1.066406-1.3125-1.542968zm134-125.839844 71.148438 68.335937-53.308594 15.441407c-.375-.546876-.8125-1.066407-1.3125-1.542969l-71.148438-68.335938 53.308594-15.441406c.375.546875.8125 1.0625 1.3125 1.542969zm-75.265625 21.804687 71.148438 68.332031-53.308594 15.445313c-.375-.546875-.8125-1.066406-1.3125-1.542969l-71.148437-68.335937 53.308593-15.441407c.378907.542969.816407 1.0625 1.3125 1.542969zm149.960938-45.367187c3.210937-.929688 6.519531-1.402344 9.835937-1.402344 15.824219 0 29.9375 10.578125 34.328125 25.726562l14.367188 49.589844-40.121094 11.621094c-.378906-.546875-.816406-1.0625-1.316406-1.542969l-71.144531-68.332031zm-328.9375 106.199218c4.609375-8.371093 12.160156-14.433593 21.261719-17.070312l5.875-1.703125c.378906.546875.816406 1.066406 1.3125 1.542969l71.148437 68.335937-88.292969 25.578125-14.367187-49.589844c-2.636719-9.097656-1.546875-18.71875 3.0625-27.09375zm14.480469 99.074219h87.972656l-42.484375 73.585938h-45.488281zm303.65625 73.585938 42.484374-73.585938h45.488282v73.585938zm0 0"
    }
  }), _c("path", {
    attrs: {
      d: "m303.921875 405.113281c0-3.574219-1.90625-6.875-5-8.660156l-87.855469-50.722656c-3.09375-1.785157-6.90625-1.785157-10 0-3.09375 1.785156-5 5.085937-5 8.660156v101.445313c0 3.570312 1.90625 6.871093 5 8.65625 1.546875.894531 3.273438 1.34375 5 1.34375 1.726563 0 3.453125-.449219 5-1.34375l87.855469-50.71875c3.09375-1.785157 5-5.085938 5-8.660157zm-87.855469 33.402344v-66.804687l57.855469 33.402343zm0 0"
    }
  }), _c("path", {
    attrs: {
      d: "m234.773438 492c-5.507813 0-10 4.492188-10 10s4.492187 10 10 10c5.511718 0 10-4.492188 10-10s-4.488282-10-10-10zm0 0"
    }
  })])]) : _vm.name === "borchure" ? _c("svg", {
    attrs: {
      id: "Capa_1",
      "enable-background": "new 0 0 512 512",
      height: "512",
      viewBox: "0 0 512 512",
      width: "512",
      xmlns: "http://www.w3.org/2000/svg"
    }
  }, [_c("g", [_c("g", [_c("g", [_c("path", {
    attrs: {
      d: "m444.958 337.623h-223.949c-4.144 0-7.503 3.359-7.503 7.503s3.359 7.503 7.503 7.503h223.949c4.144 0 7.503-3.359 7.503-7.503-.001-4.144-3.359-7.503-7.503-7.503z"
    }
  }), _c("path", {
    attrs: {
      d: "m444.958 378.638h-223.949c-4.144 0-7.503 3.359-7.503 7.503s3.359 7.503 7.503 7.503h223.949c4.144 0 7.503-3.359 7.503-7.503-.001-4.144-3.359-7.503-7.503-7.503z"
    }
  }), _c("path", {
    attrs: {
      d: "m385.687 419.653h-164.678c-4.144 0-7.503 3.359-7.503 7.503s3.359 7.503 7.503 7.503h164.678c4.144 0 7.503-3.359 7.503-7.503s-3.359-7.503-7.503-7.503z"
    }
  }), _c("path", {
    attrs: {
      d: "m491.978 122.663-61.435-61.435c-1.408-1.407-3.316-2.198-5.306-2.198h-84.842v-32.68c0-14.53-11.821-26.35-26.351-26.35h-269.868c-14.53 0-26.351 11.821-26.351 26.35v400.27c0 14.53 11.821 26.35 26.351 26.35h99.783c4.144 0 7.503-3.359 7.503-7.503s-3.359-7.503-7.503-7.503h-99.783c-6.256 0-11.345-5.089-11.345-11.345v-400.269c0-6.256 5.09-11.345 11.345-11.345h248.232l-97.996 37.616c-12.109 4.648-20.794 15.779-22.473 28.591-.501 3.14-.275 4.979-.333 8.535h-107.601c-7.303 0-13.246 5.942-13.246 13.246v67.21c0 7.303 5.942 13.246 13.246 13.246h107.602v20.148h-107.602c-7.303 0-13.246 5.942-13.246 13.246v67.21c0 7.303 5.942 13.246 13.246 13.246h107.602v22.653h-113.345c-4.144 0-7.503 3.359-7.503 7.503s3.359 7.503 7.503 7.503h113.345v23.175h-113.345c-4.144 0-7.503 3.359-7.503 7.503s3.359 7.503 7.503 7.503h113.345v112.513c0 14.53 11.821 26.351 26.35 26.351h269.867c14.53 0 26.35-11.821 26.35-26.351v-357.684c.001-1.99-.789-3.898-2.196-5.305zm-59.239-38.017 35.82 35.82h-24.475c-6.255 0-11.345-5.09-11.345-11.345zm-213.148-25.616 103.364-39.677c1.519 1.93 2.434 4.357 2.434 6.998v32.679zm-153.827 109.413v-63.69h105.842v63.69zm0 113.849v-63.69h105.842v63.69zm402.06 214.703h-269.867c-6.256 0-11.345-5.09-11.345-11.345v-400.27c0-6.194 5.036-11.345 11.345-11.345h219.777v35.085c0 14.53 11.821 26.351 26.35 26.351h35.085v350.178c0 6.256-5.089 11.346-11.345 11.346z"
    }
  }), _c("path", {
    attrs: {
      d: "m436.466 158.832h-148.233c-4.144 0-7.503 3.359-7.503 7.503s3.359 7.503 7.503 7.503h148.234c1.125 0 2.042.916 2.042 2.041v101.428l-38.102-45.909c-8.44-10.168-24.025-10.148-32.448 0l-16.359 19.71-34.942-42.101c-8.441-10.168-24.025-10.147-32.448 0l-56.935 68.601v-101.73c0-1.125.916-2.041 2.041-2.041h23.842c4.144 0 7.503-3.359 7.503-7.503s-3.359-7.503-7.503-7.503h-23.842c-9.399 0-17.047 7.647-17.047 17.047v107.489c0 9.4 7.647 17.047 17.047 17.047h207.151c9.4 0 17.047-7.647 17.047-17.047v-107.488c0-9.4-7.648-17.047-17.048-17.047zm-56.961 82.15c2.431-2.931 6.921-2.932 9.354 0l36.873 44.428h-83.099zm-83.749-22.391c2.431-2.931 6.921-2.932 9.354 0l36.739 44.266-18.718 22.553h-82.831z"
    }
  })])])])]) : _vm.name === "project" ? _c("svg", {
    attrs: {
      id: "Capa_1",
      "enable-background": "new 0 0 512 512",
      height: "512",
      viewBox: "0 0 512 512",
      width: "512",
      xmlns: "http://www.w3.org/2000/svg"
    }
  }, [_c("g", [_c("g", [_c("path", {
    attrs: {
      d: "m474.049 80.183h-40.223v-41.428c0-21.369-17.386-38.755-38.756-38.755s-38.756 17.386-38.756 38.755v41.428h-251.742v-15.887c0-11.009-8.957-19.966-19.966-19.966h-28.77c-23.905 0-43.354 19.448-43.354 43.354v336.58.005s0 .003 0 .005c0 23.93 19.469 43.398 43.398 43.398h310.442l10.087 30.805c2.692 8.214 10.016 13.523 18.661 13.523s15.97-5.309 18.659-13.524l10.087-30.806h50.232c14.043 0 25.468-11.425 25.468-25.468v-336.551c.001-14.043-11.424-25.468-25.467-25.468zm-102.735 340.753v-308.478h16.256v308.477h-16.256zm0-323.478v-19.55h47.512v19.55zm23.756-82.458c13.099 0 23.756 10.657 23.756 23.755v24.153h-47.512v-24.153c0-13.098 10.658-23.755 23.756-23.755zm-367.587 72.683c0-15.634 12.72-28.354 28.354-28.354h28.77c2.738 0 4.966 2.228 4.966 4.966v311.647c0 2.738-2.228 4.966-4.966 4.966h-28.77c-10.831 0-20.747 3.993-28.354 10.583zm28.399 364.987c-15.659 0-28.398-12.739-28.398-28.398v-.009c0-15.634 12.72-28.354 28.354-28.354h28.77c11.009 0 19.966-8.957 19.966-19.966v-280.76h251.742v333.252c0 5.75.907 11.438 2.697 16.905l2.4 7.33zm343.592 41.139c-.943 2.88-3.394 3.191-4.403 3.191s-3.46-.311-4.403-3.192c-.878-2.647-17.948-54.362-18.631-57.873h46.068c-.678 3.482-17.706 55.082-18.631 57.874zm85.043-51.606c0 5.772-4.696 10.468-10.468 10.468h-45.32l2.4-7.33c1.79-5.467 2.697-11.154 2.697-16.905v-249.686c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v242.185h-16.256v-308.477h16.256v31.232c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-48.507h40.223c5.771 0 10.468 4.696 10.468 10.468z"
    }
  }), _c("path", {
    attrs: {
      d: "m318.785 195.661-73.828-42.625c-6.308-3.642-14.146-3.642-20.455 0l-73.828 42.625c-6.285 3.628-10.228 10.404-10.228 17.714v27.077c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-21.567l71.783 41.444v82.888l-69.056-39.87c-1.683-.971-2.728-2.782-2.728-4.724v-23.112c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v23.112c0 7.284 3.919 14.072 10.228 17.714l73.829 42.625c6.308 3.642 14.145 3.641 20.454 0l73.827-42.625c6.31-3.642 10.229-10.43 10.229-17.715v-85.249c.001-7.278-3.917-14.07-10.227-17.712zm-86.784-29.634c1.684-.972 3.774-.971 5.456 0l69.056 39.87-71.783 41.444-71.783-41.444zm79.284 137.322-69.056 39.87v-82.889l71.783-41.444v79.738c.001 1.943-1.044 3.753-2.727 4.725z"
    }
  })])])]) : _vm.name === "virtual" ? _c("svg", {
    attrs: {
      id: "Icons",
      height: "512",
      viewBox: "0 0 74 74",
      width: "512",
      xmlns: "http://www.w3.org/2000/svg"
    }
  }, [_c("path", {
    attrs: {
      d: "m61 60.5h-48a11.013 11.013 0 0 1 -11-11 1 1 0 0 1 1-1h26a1 1 0 0 1 .894.551l1.522 3.029h11.168l1.522-3.029a1 1 0 0 1 .894-.551h26a1 1 0 0 1 1 1 11.013 11.013 0 0 1 -11 11zm-56.944-10a9.012 9.012 0 0 0 8.944 8h48a9.012 9.012 0 0 0 8.944-8h-24.328l-1.522 3.029a1 1 0 0 1 -.894.551h-12.4a1 1 0 0 1 -.894-.551l-1.522-3.029z"
    }
  }), _c("path", {
    attrs: {
      d: "m45.68 15.5h-2.97a1 1 0 0 1 0-2h2.97a1 1 0 0 1 0 2z"
    }
  }), _c("path", {
    attrs: {
      d: "m9 50.5a1 1 0 0 1 -1-1v-31a5.006 5.006 0 0 1 5-5h12.81a1 1 0 1 1 0 2h-12.81a3 3 0 0 0 -3 3v31a1 1 0 0 1 -1 1z"
    }
  }), _c("path", {
    attrs: {
      d: "m35.71 15.5h-2.9a1 1 0 0 1 0-2h2.9a1 1 0 0 1 0 2z"
    }
  }), _c("path", {
    attrs: {
      d: "m65 50.5a1 1 0 0 1 -1-1v-31a3 3 0 0 0 -3-3h-8.32a1 1 0 0 1 0-2h8.32a5.006 5.006 0 0 1 5 5v31a1 1 0 0 1 -1 1z"
    }
  }), _c("path", {
    attrs: {
      d: "m37 42.29a1 1 0 0 1 -1-1v-10.161a1 1 0 0 1 .6-.919l8.165-3.51a1 1 0 0 1 1.395.919v10.156a1 1 0 0 1 -.6.918l-8.16 3.515a1 1 0 0 1 -.4.082zm1-10.5v7.984l6.16-2.654v-7.987z"
    }
  }), _c("path", {
    attrs: {
      d: "m37 42.29a1 1 0 0 1 -.4-.082l-8.16-3.515a1 1 0 0 1 -.6-.918v-10.161a1 1 0 0 1 1.395-.919l8.165 3.515a1 1 0 0 1 .6.919v10.161a1 1 0 0 1 -1 1zm-7.16-5.173 6.16 2.654v-7.984l-6.16-2.654z"
    }
  }), _c("path", {
    attrs: {
      d: "m45.159 28.614a1 1 0 0 1 -.4-.086l-7.759-3.434-7.755 3.434a1 1 0 0 1 -.81-1.829l8.16-3.614a1 1 0 0 1 .81 0l8.16 3.614a1 1 0 0 1 -.406 1.915z"
    }
  })]) : _vm.name === "sample" ? _c("svg", {
    attrs: {
      id: "Capa_1",
      "enable-background": "new 0 0 512 512",
      height: "512",
      viewBox: "0 0 512 512",
      width: "512",
      xmlns: "http://www.w3.org/2000/svg"
    }
  }, [_c("g", [_c("path", {
    attrs: {
      d: "m430.928 233.886v33.008c32.309 16.144 51.082 36.127 51.082 55.951 0 45.434-91.41 81.126-181.847 88.649-8.257.68-14.395 7.927-13.705 16.174.648 7.932 7.487 14.336 16.174 13.715 78.723-6.481 209.368-40.451 209.368-118.538 0-42.648-41.729-71.987-81.072-88.959z"
    }
  }), _c("path", {
    attrs: {
      d: "m165.821 360.564c-8.329-8.475-22.804-4.333-25.346 7.31l-6.627 30.346c-99.272-26.719-146.934-84.187-52.598-131.326v-33.008c-123.786 53.4-104.361 153.699 46.19 193.674l-5.959 27.284c-2.555 11.698 9.038 21.593 20.219 17.121l74.974-29.99c9.918-3.966 12.636-16.788 5.128-24.431z"
    }
  }), _c("path", {
    attrs: {
      d: "m262.671 40.888c-4.624-2.621-10.288-2.597-14.89.06l-121.551 70.177c20.586 11.885 118.654 68.505 129.841 74.964l129.885-75.34z"
    }
  }), _c("path", {
    attrs: {
      d: "m111.236 277.451c0 5.358 2.858 10.307 7.497 12.986l122.361 70.645v-149.012l-129.859-74.974v140.355z"
    }
  }), _c("path", {
    attrs: {
      d: "m400.942 277.451v-140.726l-129.858 75.325v149.032l122.361-70.645c4.64-2.679 7.497-7.628 7.497-12.986z"
    }
  })])]) : _vm.name === "analytic" ? _c("svg", {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      className: "h-5 w-5",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      d: "M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
    }
  })]) : _vm.name === "license" ? _c("svg", {
    staticClass: "h-6 w-6",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    }
  })]) : _vm.name === "vr" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z",
      "clip-rule": "evenodd"
    }
  })]) : _vm.name === "zoom" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      d: "M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
    }
  })]) : _vm.name === "landingpage" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z",
      "clip-rule": "evenodd"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
    }
  })]) : _vm.name === "template" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      d: "M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
    }
  })]) : _vm.name === "arrow" ? _c("svg", {
    staticClass: "flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      "aria-hidden": "true"
    }
  }, [_c("path", {
    attrs: {
      d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
    }
  })]) : _vm.name === "home" ? _c("svg", {
    staticClass: "flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      "aria-hidden": "true"
    }
  }, [_c("path", {
    attrs: {
      d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
    }
  })]) : _vm.name === "news" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z",
      "clip-rule": "evenodd"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
    }
  })]) : _vm.name === "infor" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
      "clip-rule": "evenodd"
    }
  })]) : _vm.name === "setting" ? _c("svg", {
    staticClass: "h-6 w-6",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    }
  })]) : _vm.name === "profile" ? _c("svg", {
    staticClass: "h-6 w-6",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      "stroke-width": "2"
    }
  }, [_c("path", {
    attrs: {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    }
  })]) : _vm.name === "question" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      "stroke-width": "2"
    }
  }, [_c("path", {
    attrs: {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    }
  })]) : _vm.name === "page" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      d: "M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
    }
  })]) : _vm.name === "delete" ? _c("svg", {
    staticClass: "h-4 w-4",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z",
      "clip-rule": "evenodd"
    }
  })]) : _vm.name === "edit" ? _c("svg", {
    staticClass: "h-4 w-4",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      d: "M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z",
      "clip-rule": "evenodd"
    }
  })]) : _vm.name === "create" ? _c("svg", {
    staticClass: "h-4 w-4",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
      "clip-rule": "evenodd"
    }
  })]) : _vm.name === "theme" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      d: "M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
    }
  })]) : _vm.name === "image" ? _c("svg", {
    staticClass: "h-4 w-4",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z",
      "clip-rule": "evenodd"
    }
  })]) : _vm.name === "link" ? _c("svg", {
    staticClass: "h-4 w-4",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z",
      "clip-rule": "evenodd"
    }
  })]) : _vm.name === "content" ? _c("svg", {
    staticClass: "h-4 w-4",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      "stroke-width": "2"
    }
  }, [_c("path", {
    attrs: {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    }
  })]) : _vm.name === "warning" ? _c("svg", {
    staticClass: "h-6 w-6",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
      "clip-rule": "evenodd"
    }
  })]) : _vm.name === "secion" ? _c("svg", {
    staticClass: "h-4 w-4",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      "stroke-width": "2"
    }
  }, [_c("path", {
    attrs: {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
    }
  })]) : _vm.name === "video" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      d: "M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
    }
  })]) : _vm.name === "theloai" ? _c("svg", {
    staticClass: "h-4 w-",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
      "clip-rule": "evenodd"
    }
  })]) : _vm.name === "new" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z",
      "clip-rule": "evenodd"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
    }
  })]) : _vm.name === "tag" ? _c("svg", {
    staticClass: "h-4 w-4",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z",
      "clip-rule": "evenodd"
    }
  })]) : _vm.name === "back" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z",
      "clip-rule": "evenodd"
    }
  })]) : _vm.name === "check" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
      "clip-rule": "evenodd"
    }
  })]) : _vm.name === "language" ? _c("svg", {
    staticClass: "h-4 w-4",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z",
      "clip-rule": "evenodd"
    }
  })]) : _vm.name === "contact" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z",
      "clip-rule": "evenodd"
    }
  })]) : _vm.name === "send" ? _c("svg", {
    staticClass: "h-4 w-4",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      d: "M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
    }
  })]) : _vm.name === "view" ? _c("svg", {
    staticClass: "h-4 w-4",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      d: "M10 12a2 2 0 100-4 2 2 0 000 4z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",
      "clip-rule": "evenodd"
    }
  })]) : _vm.name === "flag" ? _c("svg", {
    staticClass: "h-6 w-6",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      "stroke-width": "2"
    }
  }, [_c("path", {
    attrs: {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
    }
  })]) : _vm.name === "map" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z",
      "clip-rule": "evenodd"
    }
  })]) : _vm.name === "update" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      d: "M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z",
      "clip-rule": "evenodd"
    }
  })]) : _vm.name === "delete" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "fill-rule": "evenodd",
      d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z",
      "clip-rule": "evenodd"
    }
  })]) : _vm.name === "preview" ? _c("svg", {
    staticClass: "h-5 w-5",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      d: "M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
    }
  })]) : _vm.name === "coppy" ? _c("svg", {
    staticClass: "w-6 h-6",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "stroke-width": "1.5",
      stroke: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
    }
  })]) : _vm.name === "clear" ? _c("svg", {
    staticClass: "w-6 h-6",
    attrs: {
      fill: "none",
      viewBox: "0 0 24 24",
      "stroke-width": "1.5",
      stroke: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    }
  })]) : _vm.name === "sound" ? _c("svg", {
    staticClass: "w-6 h-6",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "stroke-width": "1.5",
      stroke: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
    }
  })]) : _vm.name === "expried" ? _c("svg", {
    staticClass: "w-6 h-6",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "stroke-width": "1.5",
      stroke: "currentColor"
    }
  }, [_c("path", {
    attrs: {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    }
  })]) : _vm.name === "en" ? _c("svg", {
    attrs: {
      "enable-background": "new 0 0 512 512",
      version: "1.1",
      viewBox: "0 0 512 512",
      "xml:space": "preserve",
      xmlns: "http://www.w3.org/2000/svg"
    }
  }, [_c("circle", {
    attrs: {
      cx: "256",
      cy: "256",
      r: "256",
      fill: "#F0F0F0"
    }
  }), _vm._v(" "), _c("g", {
    attrs: {
      fill: "#0052B4"
    }
  }, [_c("path", {
    attrs: {
      d: "m52.92 100.14c-20.109 26.163-35.272 56.318-44.101 89.077h133.18l-89.077-89.077z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "m503.18 189.22c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075 89.076h133.18z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "m8.819 322.78c8.83 32.758 23.993 62.913 44.101 89.075l89.074-89.075h-133.18z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "m411.86 52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.18l89.076-89.075z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "m100.14 459.08c26.163 20.109 56.318 35.272 89.076 44.102v-133.18l-89.076 89.074z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "M189.217,8.819c-32.758,8.83-62.913,23.993-89.075,44.101l89.075,89.075V8.819z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "m322.78 503.18c32.758-8.83 62.913-23.993 89.075-44.101l-89.075-89.075v133.18z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "m370 322.78l89.075 89.076c20.108-26.162 35.272-56.318 44.101-89.076h-133.18z"
    }
  })]), _vm._v(" "), _c("g", {
    attrs: {
      fill: "#D80027"
    }
  }, [_c("path", {
    attrs: {
      d: "m509.83 222.61h-220.44v-220.44c-10.931-1.423-22.075-2.167-33.392-2.167-11.319 0-22.461 0.744-33.391 2.167v220.44h-220.44c-1.423 10.931-2.167 22.075-2.167 33.392 0 11.319 0.744 22.461 2.167 33.391h220.44v220.44c10.931 1.423 22.073 2.167 33.392 2.167 11.317 0 22.461-0.743 33.391-2.167v-220.44h220.44c1.423-10.931 2.167-22.073 2.167-33.392 0-11.317-0.744-22.461-2.167-33.391z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "m322.78 322.78l114.24 114.24c5.254-5.252 10.266-10.743 15.048-16.435l-97.802-97.802h-31.482v1e-3z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "m189.22 322.78h-2e-3l-114.24 114.24c5.252 5.254 10.743 10.266 16.435 15.048l97.802-97.804v-31.479z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "m189.22 189.22v-2e-3l-114.24-114.24c-5.254 5.252-10.266 10.743-15.048 16.435l97.803 97.803h31.481z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      d: "m322.78 189.22l114.24-114.24c-5.252-5.254-10.743-10.266-16.435-15.047l-97.802 97.803v31.482z"
    }
  })])]) : _vm.name === "cn" ? _c("svg", {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      version: "1.1",
      width: "256",
      height: "256",
      viewBox: "0 0 256 256",
      "xml:space": "preserve"
    }
  }, [_c("defs"), _vm._v(" "), _c("g", {
    staticStyle: {
      stroke: "none",
      "stroke-width": "0",
      "stroke-dasharray": "none",
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter",
      "stroke-miterlimit": "10",
      fill: "none",
      "fill-rule": "nonzero",
      opacity: "1"
    },
    attrs: {
      transform: "translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
    }
  }, [_c("circle", {
    staticStyle: {
      stroke: "none",
      "stroke-width": "1",
      "stroke-dasharray": "none",
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter",
      "stroke-miterlimit": "10",
      fill: "rgb(222,41,16)",
      "fill-rule": "nonzero",
      opacity: "1"
    },
    attrs: {
      cx: "45",
      cy: "45",
      r: "45",
      transform: "  matrix(1 0 0 1 0 0) "
    }
  }), _vm._v(" "), _c("polygon", {
    staticStyle: {
      stroke: "none",
      "stroke-width": "1",
      "stroke-dasharray": "none",
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter",
      "stroke-miterlimit": "10",
      fill: "rgb(255,222,0)",
      "fill-rule": "nonzero",
      opacity: "1"
    },
    attrs: {
      points: "25.78,27.66 22.93,18.9 20.09,27.66 10.85,27.66 18.32,33.09 15.47,41.87 22.93,36.44 30.4,41.87 27.55,33.09 35.02,27.66 ",
      transform: "  matrix(1 0 0 1 0 0) "
    }
  }), _vm._v(" "), _c("polygon", {
    staticStyle: {
      stroke: "none",
      "stroke-width": "1",
      "stroke-dasharray": "none",
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter",
      "stroke-miterlimit": "10",
      fill: "rgb(255,222,0)",
      "fill-rule": "nonzero",
      opacity: "1"
    },
    attrs: {
      points: "43.5,20.39 45.09,23.03 45.36,19.96 48.36,19.27 45.53,18.07 45.8,15 43.78,17.32 40.95,16.12 42.53,18.76 40.51,21.07 ",
      transform: "  matrix(1 0 0 1 0 0) "
    }
  }), _vm._v(" "), _c("polygon", {
    staticStyle: {
      stroke: "none",
      "stroke-width": "1",
      "stroke-dasharray": "none",
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter",
      "stroke-miterlimit": "10",
      fill: "rgb(255,222,0)",
      "fill-rule": "nonzero",
      opacity: "1"
    },
    attrs: {
      points: "51.81,31.5 53.25,28.77 56.29,29.3 54.14,27.09 55.58,24.38 52.82,25.73 50.67,23.52 51.11,26.57 48.35,27.92 51.38,28.45 ",
      transform: "  matrix(1 0 0 1 0 0) "
    }
  }), _vm._v(" "), _c("polygon", {
    staticStyle: {
      stroke: "none",
      "stroke-width": "1",
      "stroke-dasharray": "none",
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter",
      "stroke-miterlimit": "10",
      fill: "rgb(255,222,0)",
      "fill-rule": "nonzero",
      opacity: "1"
    },
    attrs: {
      points: "54.1,40.5 56.52,38.6 53.45,38.71 52.39,35.82 51.54,38.78 48.48,38.89 51.02,40.6 50.17,43.56 52.6,41.67 55.15,43.39 ",
      transform: "  matrix(1 0 0 1 0 0) "
    }
  }), _vm._v(" "), _c("polygon", {
    staticStyle: {
      stroke: "none",
      "stroke-width": "1",
      "stroke-dasharray": "none",
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter",
      "stroke-miterlimit": "10",
      fill: "rgb(255,222,0)",
      "fill-rule": "nonzero",
      opacity: "1"
    },
    attrs: {
      points: "45.43,47.63 45.57,44.56 43.65,46.96 40.77,45.88 42.46,48.44 40.54,50.85 43.51,50.03 45.2,52.61 45.34,49.53 48.31,48.72 ",
      transform: "  matrix(1 0 0 1 0 0) "
    }
  })])]) : _vm.name === "cn" ? _c("svg", {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      version: "1.1",
      width: "256",
      height: "256",
      viewBox: "0 0 256 256",
      "xml:space": "preserve"
    }
  }, [_c("defs"), _vm._v(" "), _c("g", {
    staticStyle: {
      stroke: "none",
      "stroke-width": "0",
      "stroke-dasharray": "none",
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter",
      "stroke-miterlimit": "10",
      fill: "none",
      "fill-rule": "nonzero",
      opacity: "1"
    },
    attrs: {
      transform: "translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
    }
  }, [_c("circle", {
    staticStyle: {
      stroke: "none",
      "stroke-width": "1",
      "stroke-dasharray": "none",
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter",
      "stroke-miterlimit": "10",
      fill: "rgb(222,41,16)",
      "fill-rule": "nonzero",
      opacity: "1"
    },
    attrs: {
      cx: "45",
      cy: "45",
      r: "45",
      transform: "  matrix(1 0 0 1 0 0) "
    }
  }), _vm._v(" "), _c("polygon", {
    staticStyle: {
      stroke: "none",
      "stroke-width": "1",
      "stroke-dasharray": "none",
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter",
      "stroke-miterlimit": "10",
      fill: "rgb(255,222,0)",
      "fill-rule": "nonzero",
      opacity: "1"
    },
    attrs: {
      points: "25.78,27.66 22.93,18.9 20.09,27.66 10.85,27.66 18.32,33.09 15.47,41.87 22.93,36.44 30.4,41.87 27.55,33.09 35.02,27.66 ",
      transform: "  matrix(1 0 0 1 0 0) "
    }
  }), _vm._v(" "), _c("polygon", {
    staticStyle: {
      stroke: "none",
      "stroke-width": "1",
      "stroke-dasharray": "none",
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter",
      "stroke-miterlimit": "10",
      fill: "rgb(255,222,0)",
      "fill-rule": "nonzero",
      opacity: "1"
    },
    attrs: {
      points: "43.5,20.39 45.09,23.03 45.36,19.96 48.36,19.27 45.53,18.07 45.8,15 43.78,17.32 40.95,16.12 42.53,18.76 40.51,21.07 ",
      transform: "  matrix(1 0 0 1 0 0) "
    }
  }), _vm._v(" "), _c("polygon", {
    staticStyle: {
      stroke: "none",
      "stroke-width": "1",
      "stroke-dasharray": "none",
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter",
      "stroke-miterlimit": "10",
      fill: "rgb(255,222,0)",
      "fill-rule": "nonzero",
      opacity: "1"
    },
    attrs: {
      points: "51.81,31.5 53.25,28.77 56.29,29.3 54.14,27.09 55.58,24.38 52.82,25.73 50.67,23.52 51.11,26.57 48.35,27.92 51.38,28.45 ",
      transform: "  matrix(1 0 0 1 0 0) "
    }
  }), _vm._v(" "), _c("polygon", {
    staticStyle: {
      stroke: "none",
      "stroke-width": "1",
      "stroke-dasharray": "none",
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter",
      "stroke-miterlimit": "10",
      fill: "rgb(255,222,0)",
      "fill-rule": "nonzero",
      opacity: "1"
    },
    attrs: {
      points: "54.1,40.5 56.52,38.6 53.45,38.71 52.39,35.82 51.54,38.78 48.48,38.89 51.02,40.6 50.17,43.56 52.6,41.67 55.15,43.39 ",
      transform: "  matrix(1 0 0 1 0 0) "
    }
  }), _vm._v(" "), _c("polygon", {
    staticStyle: {
      stroke: "none",
      "stroke-width": "1",
      "stroke-dasharray": "none",
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter",
      "stroke-miterlimit": "10",
      fill: "rgb(255,222,0)",
      "fill-rule": "nonzero",
      opacity: "1"
    },
    attrs: {
      points: "45.43,47.63 45.57,44.56 43.65,46.96 40.77,45.88 42.46,48.44 40.54,50.85 43.51,50.03 45.2,52.61 45.34,49.53 48.31,48.72 ",
      transform: "  matrix(1 0 0 1 0 0) "
    }
  })])]) : _vm._e();
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/LanguageSelector.vue?vue&type=template&id=05a21a22&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/LanguageSelector.vue?vue&type=template&id=05a21a22&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("li", {
    staticClass: "dropdown user user-menu"
  }, [_c("a", {
    staticClass: "dropdown-toggle",
    attrs: {
      href: "javascript:;",
      "data-toggle": "dropdown"
    }
  }, [_c("icon", {
    staticClass: "w-8 h-8",
    attrs: {
      name: _vm.selectable_locale
    }
  })], 1), _vm._v(" "), _c("ul", {
    staticClass: "dropdown-menu",
    staticStyle: {
      width: "100px"
    }
  }, _vm._l(_vm.$page.props.locales, function (value, key) {
    return _c("li", {
      key: key,
      "class": key == _vm.$page.props.locale ? "bg-gray-300" : ""
    }, [_c("Link", {
      staticClass: "language",
      staticStyle: {
        display: "flex"
      },
      attrs: {
        href: _vm.route("language", [key])
      }
    }, [_c("icon", {
      staticClass: "w-8 h-10",
      attrs: {
        name: key
      }
    }), _vm._v(" "), _c("span", {
      staticClass: "pl-4 text-center"
    }, [_vm._v(_vm._s(value))])], 1)], 1);
  }), 0)]);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/ContentHeader.vue?vue&type=template&id=31563b28&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/ContentHeader.vue?vue&type=template&id=31563b28& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("section", {
    staticClass: "content-header"
  }, [_c("h1", [_vm._v(_vm._s(_vm.name.toUpperCase()))]), _vm._v(" "), _c("ol", {
    staticClass: "breadcrumb"
  }, [_vm._m(0), _vm._v(" "), _c("li", {
    staticClass: "active"
  }, [_vm._v(_vm._s(_vm.name.toUpperCase()))])])]);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("li", [_c("a", {
    attrs: {
      href: "javascript:;"
    }
  }, [_c("i", {
    staticClass: "fa fa-home"
  }), _vm._v("Home\n      ")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/DashFooter.vue?vue&type=template&id=11e69837&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/DashFooter.vue?vue&type=template&id=11e69837& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("footer", {
    staticClass: "main-footer"
  }, [_c("strong", [_vm._v("Copyright © " + _vm._s(_vm.year) + "\n  "), _c("a", {
    attrs: {
      href: "javascript:;"
    }
  }), _vm._v(".")]), _vm._v(" All rights reserved.\n")]);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Header.vue?vue&type=template&id=7f65f7f7&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Header.vue?vue&type=template&id=7f65f7f7& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _vm._m(0);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("header", {
    staticClass: "main-header"
  }, [_c("span", {
    staticClass: "logo-mini"
  }, [_c("a", {
    attrs: {
      href: "/"
    }
  }, [_c("img", {
    staticClass: "img-responsive center-block logo",
    attrs: {
      src: "/static/img/logoxanh.svg",
      alt: "Logo"
    }
  })])]), _vm._v(" "), _c("nav", {
    staticClass: "navbar navbar-static-top",
    attrs: {
      role: "navigation"
    }
  }, [_c("a", {
    staticClass: "sidebar-toggle",
    attrs: {
      href: "javascript:;",
      "data-toggle": "offcanvas",
      role: "button"
    }
  }, [_c("span", {
    staticClass: "sr-only"
  }, [_vm._v("Toggle navigation")])]), _vm._v(" "), _c("div", {
    staticClass: "navbar-custom-menu"
  }, [_c("ul", {
    staticClass: "nav navbar-nav flex felx-wrap"
  })])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Layout.vue?vue&type=template&id=1de47a14&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Layout.vue?vue&type=template&id=1de47a14& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    "class": ["wrapper", _vm.classes]
  }, [_c("Header"), _vm._v(" "), _c("SiderBar"), _vm._v(" "), _c("div", {
    staticClass: "content-wrapper"
  }, [_c("transition", {
    attrs: {
      name: "custom-classes-transition",
      "enter-active-class": "animated pulse"
    }
  }, [_vm._t("default")], 2)], 1), _vm._v(" "), _c("dash-footer")], 1);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Menu.vue?vue&type=template&id=153a9e49&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Menu.vue?vue&type=template&id=153a9e49& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("ul", {
    staticClass: "sidebar-menu"
  }, [_c("li", {
    staticClass: "header"
  }, [_vm._v("Device Manager")]), _vm._v(" "), _c("li", {
    staticClass: "pageli",
    attrs: {
      tag: "li"
    }
  }), _c("li", {
    "class": [_vm.$page.component === "Devices/Index" ? "active" : ""]
  }, [_c("Link", {
    attrs: {
      href: _vm.route("device.index"),
      only: ["devices"]
    }
  }, [_c("i", {
    staticClass: "fa fa-tasks"
  }), _vm._v(" Devices\n        ")])], 1), _vm._v(" "), _c("li", {
    staticClass: "pageli",
    attrs: {
      tag: "li"
    }
  }), _vm.hasAnyPermission(["user-manager"]) ? _c("li", {
    "class": [_vm.$page.component === "Application/Index" ? "active" : ""]
  }, [_c("Link", {
    attrs: {
      href: _vm.route("application.index")
    }
  }, [_c("i", {
    staticClass: "fa fa-th",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Applications\n        ")])], 1) : _vm._e(), _vm._v(" "), _c("li", {
    staticClass: "pageli",
    attrs: {
      tag: "li"
    }
  }), _vm.hasAnyPermission(["user-manager"]) ? _c("li", {
    "class": [_vm.$page.component === "ApplicationDefault/Index" ? "active" : ""]
  }, [_c("Link", {
    attrs: {
      href: _vm.route("default-application.index")
    }
  }, [_c("i", {
    staticClass: "fa fa-th",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("Default Applications \n        ")])], 1) : _vm._e(), _vm._v(" "), _c("li", {
    staticClass: "pageli",
    attrs: {
      tag: "li"
    }
  }), _c("li", {
    "class": [_vm.$page.component === "Window/Index" ? "active" : ""]
  }, [_c("Link", {
    attrs: {
      href: _vm.route("window-app.index")
    }
  }, [_c("i", {
    staticClass: "fa fa-windows",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" WindowApp\n        ")])], 1), _vm._v(" "), _c("li", {
    staticClass: "pageli",
    attrs: {
      tag: "li"
    }
  }), _vm.hasAnyPermission(["user-manager"]) ? _c("li", {
    "class": [_vm.$page.component === "Wifi/Index" ? "active" : ""]
  }, [_c("Link", {
    attrs: {
      href: _vm.route("wifi.index")
    }
  }, [_c("i", {
    staticClass: "fa fa-wifi",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Wifi\n        ")])], 1) : _vm._e(), _vm._v(" "), _c("li", {
    staticClass: "pageli",
    attrs: {
      tag: "li"
    }
  }), _c("li", {
    "class": [_vm.$page.component === "Group/Index" ? "active" : ""]
  }, [_c("Link", {
    attrs: {
      href: _vm.route("group.index")
    }
  }, [_c("i", {
    staticClass: "fa fa-folder-o",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Groups\n        ")])], 1), _vm._v(" "), _vm.hasAnyPermission(["user-manager"]) ? _c("li", {
    "class": [_vm.$page.component === "APK/Index" ? "active" : ""]
  }, [_c("Link", {
    attrs: {
      href: _vm.route("apk.index")
    }
  }, [_c("i", {
    staticClass: "fa fa-file-archive-o",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Installing \n        ")])], 1) : _vm._e(), _vm._v(" "), _c("li", {
    staticClass: "header"
  }), _vm._v(" "), _c("li", {
    "class": [_vm.$page.component === "topup" ? "active" : ""],
    attrs: {
      tag: "li"
    }
  }, [_c("Link", {
    attrs: {
      href: _vm.route("topup.index")
    }
  }, [_c("i", {
    staticClass: "fa fa-shopping-cart",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" "), _c("span", {
    staticClass: "page"
  }, [_vm._v("Top Up")])])], 1), _vm._v(" "), _c("li", {
    "class": [_vm.$page.component === "payment" ? "active" : ""],
    attrs: {
      tag: "li"
    }
  }, [_c("Link", {
    attrs: {
      href: _vm.route("payment.index")
    }
  }, [_c("i", {
    staticClass: "fa fa-shopping-cart",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" "), _c("span", {
    staticClass: "page"
  }, [_vm._v("Bill")])])], 1), _vm._v(" "), _vm.hasAnyPermission(["user-manager"]) ? _c("li", {
    staticClass: "header"
  }, [_vm._v("User managerment")]) : _vm._e(), _vm._v(" "), _vm.hasAnyPermission(["user-manager"]) ? _c("li", {
    staticClass: "treeview"
  }, [_vm._m(0), _vm._v(" "), _c("ul", {
    staticClass: "treeview-menu"
  }, [_c("li", {
    "class": [_vm.$page.component === "Admin/Permission" ? "active" : ""]
  }, [_c("Link", {
    attrs: {
      href: _vm.route("permissions.index")
    }
  }, [_c("i", {
    staticClass: "fa fa-shield"
  }), _vm._v(" Permissions\n        ")])], 1), _vm._v(" "), _c("li", {
    "class": [_vm.$page.component === "Admin/Roles" ? "active" : ""]
  }, [_c("Link", {
    attrs: {
      href: _vm.route("roles.index")
    }
  }, [_c("i", {
    staticClass: "fa fa-check-circle"
  }), _vm._v(" Roles\n        ")])], 1), _vm._v(" "), _c("li", {
    "class": [_vm.$page.component === "Admin/User" ? "active" : ""]
  }, [_c("Link", {
    attrs: {
      href: _vm.route("users.index")
    }
  }, [_c("i", {
    staticClass: "fa fa-users"
  }), _vm._v(" Users\n        ")])], 1)])]) : _vm._e(), _vm._v(" "), _vm.hasAnyPermission(["user-manager"]) ? _c("li", {
    staticClass: "header"
  }, [_vm._v("Admin managerment")]) : _vm._e(), _vm._v(" "), _vm.hasAnyPermission(["user-manager"]) ? _c("li", {
    staticClass: "treeview"
  }, [_vm._m(1), _vm._v(" "), _c("ul", {
    staticClass: "treeview-menu"
  }, [_c("li", {
    "class": [_vm.$page.component === "Package/Index" ? "active" : ""]
  }, [_c("Link", {
    attrs: {
      href: _vm.route("package.index")
    }
  }, [_c("i", {
    staticClass: "fa fa-product-hunt",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Package License\n        ")])], 1)])]) : _vm._e(), _vm._v(" "), _c("li", {
    staticClass: "header"
  }, [_vm._v("Logout")]), _vm._v(" "), _c("li", {
    staticClass: "pageli",
    attrs: {
      tag: "li"
    }
  }, [_c("Link", {
    attrs: {
      href: _vm.route("logout"),
      method: "post"
    }
  }, [_c("i", {
    staticClass: "fa fa-sign-out text-yellow"
  }), _vm._v(" "), _c("span", {
    staticClass: "page"
  }, [_vm._v("Logout")])])], 1)]);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("a", {
    attrs: {
      href: "#"
    }
  }, [_c("i", {
    staticClass: "fa fa-list"
  }), _vm._v(" "), _c("span", {
    staticClass: "treeview-title"
  }, [_vm._v("User managerment")]), _vm._v(" "), _c("span", {
    staticClass: "pull-right-container pull-right"
  }, [_c("i", {
    staticClass: "fa fa-angle-left fa-fw"
  })])]);
}, function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("a", {
    attrs: {
      href: "#"
    }
  }, [_c("i", {
    staticClass: "fa fa-list"
  }), _vm._v(" "), _c("span", {
    staticClass: "treeview-title"
  }, [_vm._v("Admin managerment")]), _vm._v(" "), _c("span", {
    staticClass: "pull-right-container pull-right"
  }, [_c("i", {
    staticClass: "fa fa-angle-left fa-fw"
  })])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/SiderBar.vue?vue&type=template&id=09107b82&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/SiderBar.vue?vue&type=template&id=09107b82& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("aside", {
    staticClass: "main-sidebar"
  }, [_c("section", {
    staticClass: "sidebar"
  }, [_c("div", {
    staticClass: "user-panel"
  }, [_c("div", {
    staticClass: "pull-left image"
  }, [_vm.$page.props.auth.user ? _c("img", {
    attrs: {
      src: _vm.$page.props.auth.user.avatar
    }
  }) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "pull-left info"
  }, [_c("div", [_vm.$page.props.auth.user ? _c("p", {
    staticClass: "white"
  }, [_vm._v(_vm._s(_vm.$page.props.auth.user.name))]) : _vm._e()]), _vm._v(" "), _vm._m(0)])]), _vm._v(" "), _c("form", {
    staticClass: "sidebar-form",
    attrs: {
      id: "searchForm"
    },
    on: {
      submit: function submit($event) {
        $event.preventDefault();
      }
    }
  }, [_vm._m(1)]), _vm._v(" "), _c("Menu")], 1)]);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("a", {
    attrs: {
      href: "javascript:;"
    }
  }, [_c("i", {
    staticClass: "fa fa-circle text-success"
  }), _vm._v(" Online\n        ")]);
}, function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "input-group",
    attrs: {
      id: "searchContainer"
    }
  }, [_c("span", {
    staticClass: "input-group-btn"
  }, [_c("input", {
    staticClass: "search form-control",
    attrs: {
      type: "text",
      name: "search",
      id: "search",
      "data-toggle": "hideseek",
      p: "",
      laceholder: "Search Menus",
      "data-list": ".sidebar-menu"
    }
  }), _vm._v(" "), _c("button", {
    staticClass: "btn btn-flat",
    attrs: {
      type: "submit",
      name: "search",
      id: "search-btn"
    }
  }, [_c("i", {
    staticClass: "fa fa-search"
  })])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/UserMenu.vue?vue&type=template&id=99248b98&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/UserMenu.vue?vue&type=template&id=99248b98& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("li", {
    staticClass: "dropdown user user-menu"
  }, [_c("a", {
    staticClass: "dropdown-toggle",
    attrs: {
      href: "javascript:;",
      "data-toggle": "dropdown"
    }
  }, [_c("img", {
    staticClass: "user-image",
    attrs: {
      src: _vm.$page.props.auth.user.avatar,
      alt: "User Image"
    }
  }), _vm._v(" "), _c("span", {
    staticClass: "hidden-xs"
  }, [_vm._v(_vm._s(_vm.$page.props.auth.user.name))])]), _vm._v(" "), _c("ul", {
    staticClass: "dropdown-menu"
  }, [_c("li", {
    staticClass: "user-header",
    staticStyle: {
      height: "auto",
      "min-height": "85px",
      "padding-bottom": "15px"
    }
  }, [_c("p", [_c("span", [_vm._v(_vm._s(_vm.$page.props.auth.user.name))]), _vm._v(" "), _vm._l(_vm.$page.props.auth.user.roles, function (role) {
    return _c("small", {
      key: role
    }, [_vm._v(_vm._s(role))]);
  })], 2)]), _vm._v(" "), _c("li", {
    staticClass: "user-footer"
  }, [_c("a", {
    staticClass: "btn btn-default btn-flat btn-block",
    on: {
      click: function click($event) {
        return _vm.logout();
      }
    }
  }, [_vm._v("Logout")])])])]);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Pagination.vue?vue&type=template&id=0e1fe725&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Pagination.vue?vue&type=template&id=0e1fe725& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _vm.links.length > 3 ? _c("div", {
    staticClass: "mt-8"
  }, [_c("div", {
    staticClass: "flex flex-wrap -mb-1"
  }, _vm._l(_vm.links, function (link, k) {
    return _c("div", {
      key: k
    }, [link.url === null ? _c("div", {
      staticClass: "mr-1 mb-1 px-6 py-3 text-xl leading-4 text-gray-400 border rounded",
      domProps: {
        innerHTML: _vm._s(link.label)
      }
    }) : _c("Link", {
      staticClass: "mr-1 mb-1 px-6 py-3 text-xl leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500",
      "class": {
        "bg-blue-700 text-white": link.active
      },
      attrs: {
        href: link.url
      },
      domProps: {
        innerHTML: _vm._s(link.label)
      }
    })], 1);
  }), 0)]) : _vm._e();
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/ImportModal.vue?vue&type=template&id=0d212662&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/ImportModal.vue?vue&type=template&id=0d212662& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "modal fade",
    attrs: {
      id: "importModal",
      tabindex: "-1",
      role: "dialog",
      "aria-labelledby": "exampleModalLabel",
      "aria-hidden": "true"
    }
  }, [_c("div", {
    staticClass: "modal-dialog",
    attrs: {
      role: "document"
    }
  }, [_c("div", {
    staticClass: "modal-content"
  }, [_vm._m(0), _vm._v(" "), _c("div", {
    staticClass: "modal-body"
  }, [_c("form", {
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.save.apply(null, arguments);
      }
    }
  }, [_c("div", {
    staticClass: "relative p-6 flex-auto"
  }, [_c("div", {
    staticClass: "flex flex-wrap -mx-3 mb-6"
  }, [_c("div", {
    staticClass: "w-full md:w-1/2 px-3 mb-6 md:mb-0"
  }, [_c("label", {
    staticClass: "block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2",
    attrs: {
      "for": "grid-first-name"
    }
  }, [_vm._v(_vm._s(_vm.__("US")))]), _vm._v(" "), _c("div", {
    staticClass: "flex items-center mb-4"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.check,
      expression: "form.check"
    }],
    staticClass: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
    attrs: {
      id: "default-radio-1",
      type: "radio",
      value: "us",
      name: "default-radio"
    },
    domProps: {
      checked: _vm._q(_vm.form.check, "us")
    },
    on: {
      change: function change($event) {
        return _vm.$set(_vm.form, "check", "us");
      }
    }
  }), _vm._v(" "), _c("label", {
    staticClass: "ml-2 text-xl font-medium text-gray-900 dark:text-gray-300",
    attrs: {
      "for": "default-radio-1"
    }
  }, [_vm._v("Checked state")])]), _vm._v(" "), _vm.errors.name ? _c("p", {
    staticClass: "text-red-500 text-xl italic"
  }, [_vm._v(_vm._s(_vm.errors.name))]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "w-full md:w-1/2 px-3"
  }, [_c("label", {
    staticClass: "block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2",
    attrs: {
      "for": "grid-last-name"
    }
  }, [_vm._v(_vm._s(_vm.__("China")))]), _vm._v(" "), _c("div", {
    staticClass: "flex items-center"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.check,
      expression: "form.check"
    }],
    staticClass: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
    attrs: {
      id: "default-radio-2",
      type: "radio",
      value: "china",
      name: "default-radio"
    },
    domProps: {
      checked: _vm._q(_vm.form.check, "china")
    },
    on: {
      change: function change($event) {
        return _vm.$set(_vm.form, "check", "china");
      }
    }
  }), _vm._v(" "), _c("label", {
    staticClass: "ml-2 text-xl font-medium text-gray-900 dark:text-gray-300",
    attrs: {
      "for": "default-radio-2"
    }
  }, [_vm._v("Checked state")])]), _vm._v(" "), _vm.errors.email ? _c("p", {
    staticClass: "text-red-500 text-xl italic"
  }, [_vm._v(_vm._s(_vm.errors.email))]) : _vm._e()])])]), _vm._v(" "), _c("div", {
    staticClass: "modal-footer"
  }, [_c("button", {
    staticClass: "inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out",
    attrs: {
      type: "button",
      "data-dismiss": "modal"
    },
    on: {
      click: function click($event) {
        return _vm.reset();
      }
    }
  }, [_vm._v("Close")]), _vm._v(" "), _c("button", {
    staticClass: "inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out",
    attrs: {
      type: "submit"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.save();
      }
    }
  }, [_vm._v("Import")])])])])])])]);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "modal-header"
  }, [_c("h5", {
    staticClass: "modal-title",
    attrs: {
      id: "exampleModalLabel"
    }
  }, [_vm._v("Import User")]), _vm._v(" "), _c("button", {
    staticClass: "close",
    attrs: {
      type: "button",
      "data-dismiss": "modal",
      "aria-label": "Close"
    }
  }, [_c("span", {
    attrs: {
      "aria-hidden": "true"
    }
  }, [_vm._v("×")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/UpdateUser.vue?vue&type=template&id=78f15abd&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/UpdateUser.vue?vue&type=template&id=78f15abd& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "modal fade",
    attrs: {
      id: "updateAllModal",
      tabindex: "-1",
      role: "dialog",
      "aria-labelledby": "exampleModalLabel",
      "aria-hidden": "true"
    }
  }, [_c("div", {
    staticClass: "modal-dialog",
    attrs: {
      role: "document"
    }
  }, [_c("div", {
    staticClass: "modal-content"
  }, [_vm._m(0), _vm._v(" "), _c("div", {
    staticClass: "modal-body"
  }, [_c("form", {
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.save.apply(null, arguments);
      }
    }
  }, [_c("div", {
    staticClass: "relative p-6 flex-auto"
  }, [_c("div", {
    staticClass: "flex flex-wrap -mx-3 mb-6"
  }, [_c("div", {
    staticClass: "w-full md:w-1/2 px-3 mb-6 md:mb-0"
  }, [_c("label", {
    staticClass: "block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2",
    attrs: {
      "for": "grid-first-name"
    }
  }, [_vm._v(_vm._s(_vm.__("US")))]), _vm._v(" "), _c("div", {
    staticClass: "flex items-center mb-4"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.check,
      expression: "form.check"
    }],
    staticClass: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
    attrs: {
      id: "default-radio-1",
      type: "radio",
      value: "us",
      name: "default-radio"
    },
    domProps: {
      checked: _vm._q(_vm.form.check, "us")
    },
    on: {
      change: function change($event) {
        return _vm.$set(_vm.form, "check", "us");
      }
    }
  }), _vm._v(" "), _c("label", {
    staticClass: "ml-2 text-xl font-medium text-gray-900 dark:text-gray-300",
    attrs: {
      "for": "default-radio-1"
    }
  }, [_vm._v("Checked state")])]), _vm._v(" "), _vm.errors.name ? _c("p", {
    staticClass: "text-red-500 text-xl italic"
  }, [_vm._v(_vm._s(_vm.errors.check))]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "w-full md:w-1/2 px-3"
  }, [_c("label", {
    staticClass: "block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2",
    attrs: {
      "for": "grid-last-name"
    }
  }, [_vm._v(_vm._s(_vm.__("China")))]), _vm._v(" "), _c("div", {
    staticClass: "flex items-center"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.check,
      expression: "form.check"
    }],
    staticClass: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
    attrs: {
      id: "default-radio-2",
      type: "radio",
      value: "china",
      name: "default-radio"
    },
    domProps: {
      checked: _vm._q(_vm.form.check, "china")
    },
    on: {
      change: function change($event) {
        return _vm.$set(_vm.form, "check", "china");
      }
    }
  }), _vm._v(" "), _c("label", {
    staticClass: "ml-2 text-xl font-medium text-gray-900 dark:text-gray-300",
    attrs: {
      "for": "default-radio-2"
    }
  }, [_vm._v("Checked state")])]), _vm._v(" "), _vm.errors.email ? _c("p", {
    staticClass: "text-red-500 text-xl italic"
  }, [_vm._v(_vm._s(_vm.errors.check))]) : _vm._e()])])]), _vm._v(" "), _c("div", {
    staticClass: "modal-footer"
  }, [_c("button", {
    staticClass: "inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out",
    attrs: {
      type: "button",
      "data-dismiss": "modal"
    },
    on: {
      click: function click($event) {
        return _vm.reset();
      }
    }
  }, [_vm._v("Close")]), _vm._v(" "), _c("button", {
    staticClass: "inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out",
    attrs: {
      type: "submit"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.save();
      }
    }
  }, [_vm._v("Import")])])])])])])]);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "modal-header"
  }, [_c("h5", {
    staticClass: "modal-title",
    attrs: {
      id: "exampleModalLabel"
    }
  }, [_vm._v("Update All User")]), _vm._v(" "), _c("button", {
    staticClass: "close",
    attrs: {
      type: "button",
      "data-dismiss": "modal",
      "aria-label": "Close"
    }
  }, [_c("span", {
    attrs: {
      "aria-hidden": "true"
    }
  }, [_vm._v("×")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/User.vue?vue&type=template&id=70a31f94&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/User.vue?vue&type=template&id=70a31f94& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("section", {
    staticClass: "content"
  }, [_c("ContentHeaderVue", {
    attrs: {
      name: "Users"
    }
  }), _vm._v(" "), _c("alert", {
    attrs: {
      dismissible: true
    }
  }), _vm._v(" "), _c("button", {
    staticClass: "inline-block px-8 py-4 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out",
    attrs: {
      type: "button",
      "data-toggle": "modal",
      "data-target": "#exampleModal"
    },
    on: {
      click: function click($event) {
        return _vm.clickModal();
      }
    }
  }, [_vm._v("Create User")]), _vm._v(" "), _vm.hasAnyPermission(["user-manager"]) ? _c("button", {
    staticClass: "inline-block px-8 py-4 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out",
    attrs: {
      type: "button",
      "data-toggle": "modal",
      "data-target": "#importModal"
    }
  }, [_vm._v("Import User")]) : _vm._e(), _vm._v(" "), _vm.hasAnyPermission(["user-manager"]) ? _c("button", {
    staticClass: "inline-block px-8 py-4 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out",
    attrs: {
      type: "button",
      "data-toggle": "modal",
      "data-target": "#updateAllModal"
    }
  }, [_vm._v("Update All User")]) : _vm._e(), _vm._v(" "), _c("ImportModal", {
    attrs: {
      errors: _vm.errors
    }
  }), _vm._v(" "), _c("UpdateUser", {
    attrs: {
      errors: _vm.errors
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "modal fade",
    attrs: {
      id: "exampleModal",
      tabindex: "-1",
      role: "dialog",
      "aria-labelledby": "exampleModalLabel",
      "aria-hidden": "true"
    }
  }, [_c("div", {
    staticClass: "modal-dialog",
    attrs: {
      role: "document"
    }
  }, [_c("div", {
    staticClass: "modal-content"
  }, [_c("div", {
    staticClass: "modal-header"
  }, [_vm.editMode ? _c("h5", {
    staticClass: "modal-title",
    attrs: {
      id: "exampleModalLabel"
    }
  }, [_vm._v("Update User")]) : _c("h5", {
    staticClass: "modal-title",
    attrs: {
      id: "exampleModalLabel"
    }
  }, [_vm._v("Create User")]), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c("div", {
    staticClass: "modal-body"
  }, [_c("form", {
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.save.apply(null, arguments);
      }
    }
  }, [_c("div", {
    staticClass: "relative p-6 flex-auto"
  }, [_c("div", {
    staticClass: "flex flex-wrap -mx-3 mb-6"
  }, [_c("div", {
    staticClass: "w-full md:w-1/2 px-3 mb-6 md:mb-0"
  }, [_c("label", {
    staticClass: "block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2",
    attrs: {
      "for": "grid-first-name"
    }
  }, [_vm._v(_vm._s(_vm.__("name")))]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.name,
      expression: "form.name"
    }],
    staticClass: "appearance-none block w-full bg-gray-200 text-gray-500 border rounded py-4 px-3 mb-3 text-xl leading-tight focus:outline-none focus:bg-white",
    "class": _vm.errors.name ? "border-red-500" : "",
    attrs: {
      id: "grid-first-name",
      type: "text",
      placeholder: ""
    },
    domProps: {
      value: _vm.form.name
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;

        _vm.$set(_vm.form, "name", $event.target.value);
      }
    }
  }), _vm._v(" "), _vm.errors.name ? _c("p", {
    staticClass: "text-red-500 text-xl italic"
  }, [_vm._v(_vm._s(_vm.errors.name))]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "w-full md:w-1/2 px-3"
  }, [_c("label", {
    staticClass: "block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2",
    attrs: {
      "for": "grid-last-name"
    }
  }, [_vm._v(_vm._s(_vm.__("email")))]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.email,
      expression: "form.email"
    }],
    staticClass: "appearance-none block w-full bg-gray-200 text-gray-700 border text-xl border-gray-200 rounded py-4 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
    "class": _vm.errors.email ? "border-red-500" : "",
    attrs: {
      id: "grid-last-name",
      type: "text",
      placeholder: "examp@example"
    },
    domProps: {
      value: _vm.form.email
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;

        _vm.$set(_vm.form, "email", $event.target.value);
      }
    }
  }), _vm._v(" "), _vm.errors.email ? _c("p", {
    staticClass: "text-red-500 text-xl italic"
  }, [_vm._v(_vm._s(_vm.errors.email))]) : _vm._e()])]), _vm._v(" "), _c("div", {
    staticClass: "flex flex-wrap -mx-3 mb-6"
  }, [_c("div", {
    staticClass: "w-full md:w-1/2 px-3"
  }, [_c("label", {
    staticClass: "block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2",
    attrs: {
      "for": "grid-first-name"
    }
  }, [_vm._v(_vm._s(_vm.__("password")))]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.password,
      expression: "form.password"
    }],
    staticClass: "appearance-none block w-full bg-gray-200 text-gray-500 border rounded py-4 px-3 mb-3 text-xl leading-tight focus:outline-none focus:bg-white",
    "class": _vm.errors.password ? "border-red-500" : "",
    attrs: {
      id: "grid-first-name",
      type: "text",
      placeholder: ""
    },
    domProps: {
      value: _vm.form.password
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;

        _vm.$set(_vm.form, "password", $event.target.value);
      }
    }
  }), _vm._v(" "), _vm.errors.password ? _c("p", {
    staticClass: "text-red-500 text-xl italic"
  }, [_vm._v(_vm._s(_vm.errors.password))]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "w-full md:w-1/2 px-3"
  }, [_c("label", {
    staticClass: "block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2",
    attrs: {
      "for": "grid-phone"
    }
  }, [_vm._v("Roles")]), _vm._v(" "), _c("Multiselect", {
    staticClass: "multiselect-blue",
    attrs: {
      mode: "tags",
      appendNewTag: false,
      createTag: false,
      searchable: true,
      label: "name",
      valueProp: "id",
      trackBy: "name",
      options: _vm.roles,
      classes: {
        tagsSearch: "absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full",
        container: "relative mx-auto w-full flex items-center py-2 px-3 justify-end box-border cursor-pointer border border-gray-300 rounded bg-white text-xl leading-snug outline-none",
        tags: "flex-grow flex-shrink flex flex-wrap items-center mt-1 pl-2 rtl:pl-0 rtl:pr-2",
        tag: "bg-red-600 text-white text-xl font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1"
      }
    },
    model: {
      value: _vm.form.roles,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "roles", $$v);
      },
      expression: "form.roles"
    }
  }), _vm._v(" "), _vm.errors.roles ? _c("div", {
    staticClass: "text-red-500"
  }, [_vm._v(_vm._s(_vm.errors.roles))]) : _vm._e()], 1)]), _vm._v(" "), _c("div", {
    staticClass: "flex flex-wrap -mx-3 mb-6"
  }, [_c("div", {
    staticClass: "w-full md:w-1/2 px-3 mb-6 md:mb-0"
  }, [_c("label", {
    staticClass: "block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2",
    attrs: {
      "for": "grid-first-name"
    }
  }, [_vm._v(_vm._s(_vm.__("Time Limit")))]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.time_limit,
      expression: "form.time_limit"
    }],
    staticClass: "appearance-none block w-full bg-gray-200 text-gray-500 border rounded py-4 px-3 mb-3 text-xl leading-tight focus:outline-none focus:bg-white",
    "class": _vm.errors.time_limit ? "border-red-500" : "",
    attrs: {
      id: "grid-first-name",
      type: "date",
      placeholder: ""
    },
    domProps: {
      value: _vm.form.time_limit
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;

        _vm.$set(_vm.form, "time_limit", $event.target.value);
      }
    }
  }), _vm._v(" "), _vm.errors.time_limit ? _c("p", {
    staticClass: "text-red-500 text-xl italic"
  }, [_vm._v(_vm._s(_vm.errors.time_limit))]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "w-full md:w-1/2 px-3"
  }, [_c("label", {
    staticClass: "block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2",
    attrs: {
      "for": "grid-last-name"
    }
  }, [_vm._v(_vm._s(_vm.__("Number Device")))]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.number_device,
      expression: "form.number_device"
    }],
    staticClass: "appearance-none block w-full bg-gray-200 text-gray-700 border text-xl border-gray-200 rounded py-4 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
    "class": _vm.errors.number_device ? "border-red-500" : "",
    attrs: {
      id: "grid-last-name",
      type: "number"
    },
    domProps: {
      value: _vm.form.number_device
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;

        _vm.$set(_vm.form, "number_device", $event.target.value);
      }
    }
  }), _vm._v(" "), _vm.errors.number_device ? _c("p", {
    staticClass: "text-red-500 text-xl italic"
  }, [_vm._v(_vm._s(_vm.errors.number_device))]) : _vm._e()])])]), _vm._v(" "), _c("div", {
    staticClass: "modal-footer"
  }, [_c("button", {
    staticClass: "inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out",
    attrs: {
      type: "button",
      "data-dismiss": "modal"
    }
  }, [_vm._v("Close")]), _vm._v(" "), _c("button", {
    staticClass: "inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out",
    attrs: {
      type: "submit"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.save();
      }
    }
  }, [_vm._v("Save changes")])])])])])])]), _vm._v(" "), _c("div", {
    staticClass: "w-full mb-8 mt-8 flex justify-between"
  }, [_c("div", [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.term,
      expression: "term"
    }],
    staticClass: "relative w-full px-8 py-3 text-xl rounded-r focus:shadow-outline",
    attrs: {
      autocomplete: "off",
      type: "text",
      name: "search",
      placeholder: "Search…"
    },
    domProps: {
      value: _vm.term
    },
    on: {
      keyup: _vm.search,
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.term = $event.target.value;
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "flex justify-center"
  }, [_c("div", {
    staticClass: "mb-3 xl:w-96"
  }, [_c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.filter,
      expression: "filter"
    }],
    staticClass: "form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 text-2xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none",
    attrs: {
      "aria-label": ".form-select-lg example"
    },
    on: {
      change: [function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.filter = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }, _vm.Filter]
    }
  }, [_c("option", {
    attrs: {
      value: "0"
    }
  }, [_vm._v("Filter")]), _vm._v(" "), _c("option", {
    attrs: {
      value: "active"
    }
  }, [_vm._v("User Active")]), _vm._v(" "), _c("option", {
    attrs: {
      value: "Demo"
    }
  }, [_vm._v("Role:Demo")]), _vm._v(" "), _c("option", {
    attrs: {
      value: "Lite"
    }
  }, [_vm._v("Role: Lite")]), _vm._v(" "), _c("option", {
    attrs: {
      value: "Pro"
    }
  }, [_vm._v("Role: Pro")])])])])]), _vm._v(" "), _c("div", {
    staticClass: "flex flex-col mt-6"
  }, [_c("div", {
    staticClass: "-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"
  }, [_c("div", {
    staticClass: "py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
  }, [_c("div", {
    staticClass: "shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
  }, [_c("table", {
    staticClass: "min-w-full divide-y divide-gray-200"
  }, [_vm._m(1), _vm._v(" "), _c("tbody", {
    staticClass: "bg-white divide-y divide-gray-200"
  }, _vm._l(_vm.users.data, function (user, index) {
    return _c("tr", {
      key: index
    }, [_c("td", {
      staticClass: "px-6 py-4 whitespace-nowrap"
    }, [_c("div", {
      staticClass: "flex items-center"
    }, [_c("div", {
      staticClass: "ml-4"
    }, [_c("div", {
      staticClass: "text-xl font-medium text-gray-900"
    }, [_vm._v(_vm._s(index + 1))])])])]), _vm._v(" "), _c("td", {
      staticClass: "px-6 py-4 whitespace-nowrap"
    }, [_c("Link", {
      attrs: {
        href: _vm.route("user.devices.index", user.id)
      }
    }, [_vm._v(_vm._s(user.name))])], 1), _vm._v(" "), _c("td", {
      staticClass: "px-6 py-4 whitespace-nowrap"
    }, [_c("div", {
      staticClass: "text-xl text-gray-900"
    }, [_vm._v(_vm._s(user.email))])]), _vm._v(" "), _c("td", {
      staticClass: "px-6 py-4 whitespace-nowrap"
    }, [_c("div", {
      staticClass: "text-xl text-gray-900"
    }, [_vm._v(_vm._s(user.phone))])]), _vm._v(" "), _c("td", {
      staticClass: "px-6 py-4 whitespace-nowrap"
    }, _vm._l(user.roles, function (role) {
      return _c("span", {
        key: role.id,
        staticClass: "bg-gray-600 text-gray-100 text-xl px-2 mx-1 py-1 rounded"
      }, [_vm._v(_vm._s(role.name))]);
    }), 0), _vm._v(" "), _c("td", {
      staticClass: "px-6 py-4 whitespace-nowrap"
    }, [_vm.hasAnyPermission(["users-manage"]) && _vm.$page.props.auth.user.id !== user.id && user.owner !== null ? _c("div", {
      staticClass: "text-xl text-gray-900"
    }, [_vm._v(_vm._s(user.owner.name))]) : _vm._e()]), _vm._v(" "), _c("td", {
      staticClass: "px-6 py-4 whitespace-nowrap"
    }, [user.active_demo == 1 ? _c("span", {
      staticClass: "text-2xl inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded"
    }, [_vm._v("Active")]) : _vm._e()]), _vm._v(" "), _c("td", {
      staticClass: "px-6 py-4 whitespace-nowrap"
    }, [_vm._v("\n                    " + _vm._s(_vm.formatDate(user.time_limit)) + "\n                  ")]), _vm._v(" "), _c("td", {
      staticClass: "px-6 py-4 whitespace-nowrap"
    }, [_vm._v("\n                    " + _vm._s(user.number_device) + "\n                  ")]), _vm._v(" "), _c("td", {
      staticClass: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
    }, [_c("button", {
      staticClass: "inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out",
      attrs: {
        "data-toggle": "modal",
        "data-target": "#exampleModal"
      },
      on: {
        click: function click($event) {
          return _vm.edit(user);
        }
      }
    }, [_vm._v("Update")]), _vm._v(" "), _c("button", {
      staticClass: "inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out",
      on: {
        click: function click($event) {
          return _vm.deleteRow(user.id);
        }
      }
    }, [_vm._v("Delete")])])]);
  }), 0)]), _vm._v(" "), _c("pagination", {
    staticClass: "mt-6",
    attrs: {
      links: _vm.users.links
    }
  })], 1)])])])], 1);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("button", {
    staticClass: "close",
    attrs: {
      type: "button",
      "data-dismiss": "modal",
      "aria-label": "Close"
    }
  }, [_c("span", {
    attrs: {
      "aria-hidden": "true"
    }
  }, [_vm._v("×")])]);
}, function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("thead", {
    staticClass: "bg-gray-50"
  }, [_c("tr", [_c("th", {
    staticClass: "px-6 py-3 text-left text-xl font-back text-gray-500 uppercase tracking-wider",
    attrs: {
      scope: "col"
    }
  }, [_vm._v("id")]), _vm._v(" "), _c("th", {
    staticClass: "px-6 py-3 text-left text-xl font-back text-gray-500 uppercase tracking-wider",
    attrs: {
      scope: "col"
    }
  }, [_vm._v("name")]), _vm._v(" "), _c("th", {
    staticClass: "px-6 py-3 text-left text-xl font-back text-gray-500 uppercase tracking-wider",
    attrs: {
      scope: "col"
    }
  }, [_vm._v("Email")]), _vm._v(" "), _c("th", {
    staticClass: "px-6 py-3 text-left text-xl font-back text-gray-500 uppercase tracking-wider",
    attrs: {
      scope: "col"
    }
  }, [_vm._v("Phone")]), _vm._v(" "), _c("th", {
    staticClass: "px-6 py-3 text-left text-xl font-back text-gray-500 uppercase tracking-wider",
    attrs: {
      scope: "col"
    }
  }, [_vm._v("Roles")]), _vm._v(" "), _c("th", {
    staticClass: "px-6 py-3 text-left text-xl font-back text-gray-500 uppercase tracking-wider",
    attrs: {
      scope: "col"
    }
  }, [_vm._v("Onwer")]), _vm._v(" "), _c("th", {
    staticClass: "px-6 py-3 text-left text-xl font-back text-gray-500 uppercase tracking-wider",
    attrs: {
      scope: "col"
    }
  }, [_vm._v("Active")]), _vm._v(" "), _c("th", {
    staticClass: "px-6 py-3 text-left text-xl font-back text-gray-500 uppercase tracking-wider",
    attrs: {
      scope: "col"
    }
  }, [_vm._v("Time Limit")]), _vm._v(" "), _c("th", {
    staticClass: "px-6 py-3 text-left text-xl font-back text-gray-500 uppercase tracking-wider",
    attrs: {
      scope: "col"
    }
  }, [_vm._v("Number Device")]), _vm._v(" "), _c("th", {
    staticClass: "relative px-6 py-3",
    attrs: {
      scope: "col"
    }
  }, [_c("span", {
    staticClass: "sr-only"
  }, [_vm._v("Edit")])])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/Pages/Admin/mixins/admin.js":
/*!**************************************************!*\
  !*** ./resources/js/Pages/Admin/mixins/admin.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  methods: {
    multipleSelect: function multipleSelect(data) {
      var object = Object.assign({}, data);
      console.log(_typeof(object)); // // // let first = Object.assign({}, object[0]);

      var array = [];
      $.each(object, function (key, value) {
        array.push(parseInt(value.id));
      });
      return array;
    }
  }
});

/***/ }),

/***/ "./resources/js/config/index.js":
/*!**************************************!*\
  !*** ./resources/js/config/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  serverURI: '',
  fixedLayout: true,
  hideLogoOnMobile: true
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/@vueform/multiselect/themes/default.css?vue&type=style&index=0&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/@vueform/multiselect/themes/default.css?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".multiselect{align-items:center;background:var(--ms-bg,#fff);border:var(--ms-border-width,1px) solid var(--ms-border-color,#d1d5db);border-radius:var(--ms-radius,4px);box-sizing:border-box;cursor:pointer;display:flex;font-size:var(--ms-font-size,1rem);justify-content:flex-end;margin:0 auto;min-height:calc(var(--ms-border-width, 1px)*2 + var(--ms-font-size, 1rem)*var(--ms-line-height, 1.375) + var(--ms-py, .5rem)*2);outline:none;position:relative;width:100%}.multiselect.is-open{border-radius:var(--ms-radius,4px) var(--ms-radius,4px) 0 0}.multiselect.is-open-top{border-radius:0 0 var(--ms-radius,4px) var(--ms-radius,4px)}.multiselect.is-disabled{background:var(--ms-bg-disabled,#f3f4f6);cursor:default}.multiselect.is-active{border:var(--ms-border-width-active,var(--ms-border-width,1px)) solid var(--ms-border-color-active,var(--ms-border-color,#d1d5db));box-shadow:0 0 0 var(--ms-ring-width,3px) var(--ms-ring-color,rgba(16,185,129,.188))}.multiselect-wrapper{align-items:center;box-sizing:border-box;cursor:pointer;display:flex;justify-content:flex-end;margin:0 auto;min-height:calc(var(--ms-border-width, 1px)*2 + var(--ms-font-size, 1rem)*var(--ms-line-height, 1.375) + var(--ms-py, .5rem)*2);outline:none;position:relative;width:100%}.multiselect-multiple-label,.multiselect-placeholder,.multiselect-single-label{align-items:center;background:transparent;box-sizing:border-box;display:flex;height:100%;left:0;line-height:var(--ms-line-height,1.375);max-width:100%;padding-left:var(--ms-px,.875rem);padding-right:calc(1.25rem + var(--ms-px, .875rem)*3);pointer-events:none;position:absolute;top:0}.multiselect-placeholder{color:var(--ms-placeholder-color,#9ca3af)}.multiselect-single-label-text{display:block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.multiselect-search{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:var(--ms-bg,#fff);border:0;border-radius:var(--ms-radius,4px);bottom:0;box-sizing:border-box;font-family:inherit;font-size:inherit;height:100%;left:0;outline:none;padding-left:var(--ms-px,.875rem);position:absolute;right:0;top:0;width:100%}.multiselect-search::-webkit-search-cancel-button,.multiselect-search::-webkit-search-decoration,.multiselect-search::-webkit-search-results-button,.multiselect-search::-webkit-search-results-decoration{-webkit-appearance:none}.multiselect-tags{align-items:center;display:flex;flex-grow:1;flex-shrink:1;flex-wrap:wrap;margin:var(--ms-tag-my,.25rem) 0 0;padding-left:var(--ms-py,.5rem)}.multiselect-tag{align-items:center;background:var(--ms-tag-bg,#10b981);border-radius:var(--ms-tag-radius,4px);color:var(--ms-tag-color,#fff);display:flex;font-size:var(--ms-tag-font-size,.875rem);font-weight:var(--ms-tag-font-weight,600);line-height:var(--ms-tag-line-height,1.25rem);margin-bottom:var(--ms-tag-my,.25rem);margin-right:var(--ms-tag-mx,.25rem);padding:var(--ms-tag-py,.125rem) 0 var(--ms-tag-py,.125rem) var(--ms-tag-px,.5rem);white-space:nowrap}.multiselect-tag.is-disabled{background:var(--ms-tag-bg-disabled,#9ca3af);color:var(--ms-tag-color-disabled,#fff);padding-right:var(--ms-tag-px,.5rem)}.multiselect-tag-remove{align-items:center;border-radius:var(--ms-tag-remove-radius,4px);display:flex;justify-content:center;margin:var(--ms-tag-remove-my,0) var(--ms-tag-remove-mx,.125rem);padding:var(--ms-tag-remove-py,.25rem) var(--ms-tag-remove-px,.25rem)}.multiselect-tag-remove:hover{background:rgba(0,0,0,.063)}.multiselect-tag-remove-icon{background-color:currentColor;display:inline-block;height:.75rem;-webkit-mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m207.6 256 107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'/%3E%3C/svg%3E\");mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m207.6 256 107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'/%3E%3C/svg%3E\");-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:contain;mask-size:contain;opacity:.8;width:.75rem}.multiselect-tags-search-wrapper{display:inline-block;flex-grow:1;flex-shrink:1;height:100%;margin:0 var(--ms-tag-mx,4px) var(--ms-tag-my,4px);position:relative}.multiselect-tags-search-copy{display:inline-block;height:1px;visibility:hidden;white-space:pre-wrap;width:100%}.multiselect-tags-search{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:0;bottom:0;box-sizing:border-box;font-family:inherit;font-size:inherit;left:0;outline:none;padding:0;position:absolute;right:0;top:0;width:100%}.multiselect-tags-search::-webkit-search-cancel-button,.multiselect-tags-search::-webkit-search-decoration,.multiselect-tags-search::-webkit-search-results-button,.multiselect-tags-search::-webkit-search-results-decoration{-webkit-appearance:none}.multiselect-inifite{align-items:center;display:flex;justify-content:center;min-height:calc(var(--ms-border-width, 1px)*2 + var(--ms-font-size, 1rem)*var(--ms-line-height, 1.375) + var(--ms-py, .5rem)*2);width:100%}.multiselect-inifite-spinner,.multiselect-spinner{-webkit-animation:multiselect-spin 1s linear infinite;animation:multiselect-spin 1s linear infinite;background-color:var(--ms-spinner-color,#10b981);flex-grow:0;flex-shrink:0;height:1rem;-webkit-mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 512 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m456.433 371.72-27.79-16.045c-7.192-4.152-10.052-13.136-6.487-20.636 25.82-54.328 23.566-118.602-6.768-171.03-30.265-52.529-84.802-86.621-144.76-91.424C262.35 71.922 256 64.953 256 56.649V24.56c0-9.31 7.916-16.609 17.204-15.96 81.795 5.717 156.412 51.902 197.611 123.408 41.301 71.385 43.99 159.096 8.042 232.792-4.082 8.369-14.361 11.575-22.424 6.92z'/%3E%3C/svg%3E\");mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 512 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m456.433 371.72-27.79-16.045c-7.192-4.152-10.052-13.136-6.487-20.636 25.82-54.328 23.566-118.602-6.768-171.03-30.265-52.529-84.802-86.621-144.76-91.424C262.35 71.922 256 64.953 256 56.649V24.56c0-9.31 7.916-16.609 17.204-15.96 81.795 5.717 156.412 51.902 197.611 123.408 41.301 71.385 43.99 159.096 8.042 232.792-4.082 8.369-14.361 11.575-22.424 6.92z'/%3E%3C/svg%3E\");-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:contain;mask-size:contain;width:1rem;z-index:10}.multiselect-spinner{margin:0 var(--ms-px,.875rem) 0 0}.multiselect-clear{display:flex;flex-grow:0;flex-shrink:0;opacity:1;padding:0 var(--ms-px,.875rem) 0 0;position:relative;transition:.3s;z-index:10}.multiselect-clear:hover .multiselect-clear-icon{background-color:var(--ms-clear-color-hover,#000)}.multiselect-clear-icon{background-color:var(--ms-clear-color,#999);display:inline-block;-webkit-mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m207.6 256 107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'/%3E%3C/svg%3E\");mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m207.6 256 107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'/%3E%3C/svg%3E\");transition:.3s}.multiselect-caret,.multiselect-clear-icon{height:1.125rem;-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:contain;mask-size:contain;width:.625rem}.multiselect-caret{background-color:var(--ms-caret-color,#999);flex-grow:0;flex-shrink:0;margin:0 var(--ms-px,.875rem) 0 0;-webkit-mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'/%3E%3C/svg%3E\");mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'/%3E%3C/svg%3E\");pointer-events:none;position:relative;transform:rotate(0deg);transition:transform .3s;z-index:10}.multiselect-caret.is-open{pointer-events:auto;transform:rotate(180deg)}.multiselect-dropdown{-webkit-overflow-scrolling:touch;background:var(--ms-dropdown-bg,#fff);border:var(--ms-dropdown-border-width,1px) solid var(--ms-dropdown-border-color,#d1d5db);border-radius:0 0 var(--ms-dropdown-radius,4px) var(--ms-dropdown-radius,4px);bottom:0;display:flex;flex-direction:column;left:calc(var(--ms-border-width, 1px)*-1);margin-top:calc(var(--ms-border-width, 1px)*-1);max-height:var(--ms-max-height,10rem);outline:none;overflow-y:scroll;position:absolute;right:calc(var(--ms-border-width, 1px)*-1);transform:translateY(100%);z-index:100}.multiselect-dropdown.is-top{border-radius:var(--ms-dropdown-radius,4px) var(--ms-dropdown-radius,4px) 0 0;bottom:auto;top:var(--ms-border-width,1px);transform:translateY(-100%)}.multiselect-dropdown.is-hidden{display:none}.multiselect-options{display:flex;flex-direction:column;list-style:none;margin:0;padding:0}.multiselect-group{margin:0;padding:0}.multiselect-group-label{align-items:center;background:var(--ms-group-label-bg,#e5e7eb);box-sizing:border-box;color:var(--ms-group-label-color,#374151);cursor:default;display:flex;font-size:.875rem;font-weight:600;justify-content:flex-start;line-height:var(--ms-group-label-line-height,1.375);padding:var(--ms-group-label-py,.3rem) var(--ms-group-label-px,.75rem);text-align:left;text-decoration:none}.multiselect-group-label.is-pointable{cursor:pointer}.multiselect-group-label.is-pointed{background:var(--ms-group-label-bg-pointed,#d1d5db);color:var(--ms-group-label-color-pointed,#374151)}.multiselect-group-label.is-selected{background:var(--ms-group-label-bg-selected,#059669);color:var(--ms-group-label-color-selected,#fff)}.multiselect-group-label.is-disabled{background:var(--ms-group-label-bg-disabled,#f3f4f6);color:var(--ms-group-label-color-disabled,#d1d5db);cursor:not-allowed}.multiselect-group-label.is-selected.is-pointed{background:var(--ms-group-label-bg-selected-pointed,#0c9e70);color:var(--ms-group-label-color-selected-pointed,#fff)}.multiselect-group-label.is-selected.is-disabled{background:var(--ms-group-label-bg-selected-disabled,#75cfb1);color:var(--ms-group-label-color-selected-disabled,#d1fae5)}.multiselect-group-options{margin:0;padding:0}.multiselect-option{align-items:center;box-sizing:border-box;cursor:pointer;display:flex;font-size:var(--ms-option-font-size,1rem);justify-content:flex-start;line-height:var(--ms-option-line-height,1.375);padding:var(--ms-option-py,.5rem) var(--ms-option-px,.75rem);text-align:left;text-decoration:none}.multiselect-option.is-pointed{background:var(--ms-option-bg-pointed,#f3f4f6);color:var(--ms-option-color-pointed,#1f2937)}.multiselect-option.is-selected{background:var(--ms-option-bg-selected,#10b981);color:var(--ms-option-color-selected,#fff)}.multiselect-option.is-disabled{background:var(--ms-option-bg-disabled,#fff);color:var(--ms-option-color-disabled,#d1d5db);cursor:not-allowed}.multiselect-option.is-selected.is-pointed{background:var(--ms-option-bg-selected-pointed,#26c08e);color:var(--ms-option-color-selected-pointed,#fff)}.multiselect-option.is-selected.is-disabled{background:var(--ms-option-bg-selected-disabled,#87dcc0);color:var(--ms-option-color-selected-disabled,#d1fae5)}.multiselect-no-options,.multiselect-no-results{color:var(--ms-empty-color,#4b5563);padding:var(--ms-option-py,.5rem) var(--ms-option-px,.75rem)}.multiselect-fake-input{background:transparent;border:0;bottom:-1px;font-size:0;height:1px;left:0;outline:none;padding:0;position:absolute;right:0;width:100%}.multiselect-fake-input:active,.multiselect-fake-input:focus{outline:none}.multiselect-assistive-text{clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;position:absolute;width:1px}.multiselect-spacer{display:none}[dir=rtl] .multiselect-multiple-label,[dir=rtl] .multiselect-placeholder,[dir=rtl] .multiselect-single-label{left:auto;padding-left:calc(1.25rem + var(--ms-px, .875rem)*3);padding-right:var(--ms-px,.875rem);right:0}[dir=rtl] .multiselect-search{padding-left:0;padding-right:var(--ms-px,.875rem)}[dir=rtl] .multiselect-tags{padding-left:0;padding-right:var(--ms-py,.5rem)}[dir=rtl] .multiselect-tag{margin-left:var(--ms-tag-mx,.25rem);margin-right:0;padding:var(--ms-tag-py,.125rem) var(--ms-tag-px,.5rem) var(--ms-tag-py,.125rem) 0}[dir=rtl] .multiselect-tag.is-disabled{padding-left:var(--ms-tag-px,.5rem)}[dir=rtl] .multiselect-caret,[dir=rtl] .multiselect-spinner{margin:0 0 0 var(--ms-px,.875rem)}[dir=rtl] .multiselect-clear{padding:0 0 0 var(--ms-px,.875rem)}@-webkit-keyframes multiselect-spin{0%{transform:rotate(0)}to{transform:rotate(1turn)}}@keyframes multiselect-spin{0%{transform:rotate(0)}to{transform:rotate(1turn)}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/LanguageSelector.vue?vue&type=style&index=0&id=05a21a22&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/LanguageSelector.vue?vue&type=style&index=0&id=05a21a22&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.language_icon[data-v-05a21a22] {\r\n  display: flex;\n}\na span[data-v-05a21a22]{\r\n  color: black !important;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Layout.vue?vue&type=style&index=0&id=1de47a14&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Layout.vue?vue&type=style&index=0&id=1de47a14&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.wrapper.fixed_layout .main-header {\r\n  position: fixed;\r\n  width: 100%;\n}\n.wrapper.fixed_layout .content-wrapper {\r\n  padding-top: 50px;\n}\n.wrapper.fixed_layout .main-sidebar {\r\n  position: fixed;\r\n  height: 100vh;\n}\n@media (max-width: 767px) {\n.wrapper.hide_logo .main-header .logo {\r\n    display: none;\n}\n}\n.logo-mini,\r\n.logo-lg {\r\n  text-align: left;\n}\n.logo-mini img,\r\n.logo-lg img {\r\n  padding: 0.4em !important;\n}\n.logo-lg img {\r\n  display: -webkit-inline-box;\r\n  width: 25%;\n}\n.user-panel {\r\n  height: 4em;\n}\nhr.visible-xs-block {\r\n  width: 100%;\r\n  background-color: rgba(0, 0, 0, 0.17);\r\n  height: 1px;\r\n  border-color: transparent;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Menu.vue?vue&type=style&index=0&id=153a9e49&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Menu.vue?vue&type=style&index=0&id=153a9e49&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\r\n/* override default */\n.sidebar-menu > li > a {\r\n  padding: 12px 15px 12px 15px;\n}\n.sidebar-menu li.active > a > .fa-angle-left,\r\n.sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {\r\n  -webkit-animation-name: rotate;\r\n          animation-name: rotate;\r\n  -webkit-animation-duration: 0.2s;\r\n          animation-duration: 0.2s;\r\n  -webkit-animation-fill-mode: forwards;\r\n          animation-fill-mode: forwards;\n}\n.treeview-title {\r\n  z-index: 1;\n}\n@-webkit-keyframes rotate {\n0% {\r\n    transform: rotate(0deg);\n}\n100% {\r\n    transform: rotate(-90deg);\n}\n}\n@keyframes rotate {\n0% {\r\n    transform: rotate(0deg);\n}\n100% {\r\n    transform: rotate(-90deg);\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/SiderBar.vue?vue&type=style&index=0&id=09107b82&scope=local&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/SiderBar.vue?vue&type=style&index=0&id=09107b82&scope=local&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.user-panel .image img {\r\n  border-radius: 50%;\n}\n#searchForm {\r\n  padding-left: 0em;\r\n  padding-right: 0em;\n}\n#searchContainer {\r\n  height: 100%;\r\n  padding-bottom: 0em;\n}\n#search {\r\n  width: 80%;\r\n  float: right;\n}\n#search-btn {\r\n  width: 20%;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/User.vue?vue&type=style&index=1&id=70a31f94&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/User.vue?vue&type=style&index=1&id=70a31f94&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.multiselect-tags-search {\r\n  font-size: 1.25rem;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/hideseek/jquery.hideseek.js":
/*!**************************************************!*\
  !*** ./node_modules/hideseek/jquery.hideseek.js ***!
  \**************************************************/
/***/ (() => {

/**
 * HideSeek jQuery plugin
 *
 * @copyright Copyright 2015, Dimitris Krestos
 * @license   Apache License, Version 2.0 (http://www.opensource.org/licenses/apache2.0.php)
 * @link      http://vdw.staytuned.gr
 * @version   v0.8.0
 *
 * Dependencies are include in minified versions at the bottom:
 * 1. Highlight v4 by Johann Burkard
 *
 */

  /* Sample html structure

  <input name="search" placeholder="Start typing here" type="text" data-list=".list">
  <ul class="list">
    <li>item 1</li>
    <li>...</li>
    <li><a href="#">item 2</a></li>
  </ul>

  or

  <input name="search" placeholder="Start typing here" type="text" data-list=".list">
  <div class="list">
    <span>item 1</span>
    <span>...</span>
    <span>item 2</span>
  </div>

  or any similar structure...

  */

;(function($, window, undefined) {
  "use strict";

  $.fn.hideseek = function(options) {

    var defaults = {
      list:           '.hideseek-data',
      nodata:         '',
      attribute:      'text',
      matches:        false,
      highlight:      false,
      ignore:         '',
      headers:        '',
      navigation:     false,
      ignore_accents: false,
      hidden_mode:    false,
      min_chars:      1
    };

    var options = $.extend(defaults, options);

    return this.each(function() {

      var $this = $(this);

      $this.opts = [];

      $.map( ['list', 'nodata', 'attribute', 'matches', 'highlight', 'ignore', 'headers', 'navigation', 'ignore_accents', 'hidden_mode', 'min_chars'], function( val, i ) {
        $this.opts[val] = $this.data(val) || options[val];
      } );

      if ($this.opts.headers)
        $this.opts.ignore += $this.opts.ignore ? ', ' + $this.opts.headers : $this.opts.headers;

      var $list = $($this.opts.list);

      if ($this.opts.navigation)  $this.attr('autocomplete', 'off');

      if ($this.opts.hidden_mode) $list.children().hide();

      $this.keyup(function(e) {

        if ( [38, 40, 13].indexOf(e.keyCode) == -1 && ( e.keyCode != 8 ? $this.val().length >= $this.opts.min_chars : true ) ) {

          var q = $this.val().toLowerCase();

          $list.children($this.opts.ignore.trim() ? ":not(" + $this.opts.ignore + ")" : '').removeClass('selected').each(function() {

            var data = (
                        $this.opts.attribute != 'text'
                          ? ($(this).attr($this.opts.attribute) || '')
                          : $(this).text()
                        ).toLowerCase();

            var treaty = data.removeAccents($this.opts.ignore_accents).indexOf(q) == -1 || q === ($this.opts.hidden_mode ? '' : false)

            if (treaty) {

              $(this).hide();

            } else {

              show_element($(this));

              if ($this.opts.matches && q.match(new RegExp(Object.keys($this.opts.matches)[0])) !== null) {
                if (data.match(new RegExp(Object.values($this.opts.matches)[0])) !== null) {
                  show_element($(this));
                } else {
                  $(this).hide();
                }
              }
            }

            $this.trigger('_after_each');

          });

          // No results message
          if ($this.opts.nodata) {

            $list.find('.no-results').remove();

            if (!$list.children(':not([style*="display: none"])').length) {

              $list
                .children()
                .first()
                .clone()
                .removeHighlight()
                .addClass('no-results')
                .show()
                .prependTo($this.opts.list)
                .text($this.opts.nodata);

              $this.trigger('_after_nodata');

            }

          }

          // hide headers with no results
          if ($this.opts.headers) {
            $($this.opts.headers, $list).each(function() {
              if (!$(this).nextUntil($this.opts.headers).not('[style*="display: none"],' + $this.opts.ignore).length) {
                $(this).hide();
              } else {
                $(this).show();
              }
            });
          }

          $this.trigger('_after');

        };

        function show_element(element) {
          $this.opts.highlight ? element.removeHighlight().highlight(q).show() : element.show();
        }

        // Navigation
        function current(element) {
          return element.children('.selected:visible');
        };

        function prev(element) {
          return current(element).prevAll(":visible:first");
        };

        function next(element) {
          return current(element).nextAll(":visible:first");
        };

        if ($this.opts.navigation) {

          if (e.keyCode == 38) {

            if (current($list).length) {

              prev($list).addClass('selected');

              current($list).last().removeClass('selected');

            } else {

              $list.children(':visible').last().addClass('selected');

            };

          } else if (e.keyCode == 40) {

            if (current($list).length) {

              next($list).addClass('selected');

              current($list).first().removeClass('selected');

            } else {

              $list.children(':visible').first().addClass('selected');

            };

          } else if (e.keyCode == 13) {

            if (current($list).find('a').length) {

              document.location = current($list).find('a').attr('href');

            } else {

              $this.val(current($list).text());

            };

          };

        };

      });

    });

  };

  $(document).ready(function () { $('[data-toggle="hideseek"]').hideseek(); });

})(jQuery);

/*

highlight v4

Highlights arbitrary terms.

<http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>

MIT license.

Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>

*/
jQuery.fn.highlight=function(t){function e(t,i){var n=0;if(3==t.nodeType){var a=t.data.removeAccents(true).toUpperCase().indexOf(i);if(a>=0){var s=document.createElement("mark");s.className="highlight";var r=t.splitText(a);r.splitText(i.length);var o=r.cloneNode(!0);s.appendChild(o),r.parentNode.replaceChild(s,r),n=1}}else if(1==t.nodeType&&t.childNodes&&!/(script|style)/i.test(t.tagName))for(var h=0;h<t.childNodes.length;++h)h+=e(t.childNodes[h],i);return n}return this.length&&t&&t.length?this.each(function(){e(this,t.toUpperCase())}):this},jQuery.fn.removeHighlight=function(){return this.find("mark.highlight").each(function(){with(this.parentNode.firstChild.nodeName,this.parentNode)replaceChild(this.firstChild,this),normalize()}).end()};

// Ignore accents
String.prototype.removeAccents = function(enabled) {
  if (enabled) return this
                      .replace(/[áàãâä]/gi,"a")
                      .replace(/[éè¨ê]/gi,"e")
                      .replace(/[íìïî]/gi,"i")
                      .replace(/[óòöôõ]/gi,"o")
                      .replace(/[úùüû]/gi, "u")
                      .replace(/[ç]/gi, "c")
                      .replace(/[ñ]/gi, "n");
  return this;
};


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/@vueform/multiselect/themes/default.css?vue&type=style&index=0&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/@vueform/multiselect/themes/default.css?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_cjs_js_clonedRuleSet_10_use_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_default_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../vue-loader/lib/loaders/stylePostLoader.js!../../../postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./default.css?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/@vueform/multiselect/themes/default.css?vue&type=style&index=0&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_default_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_default_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/LanguageSelector.vue?vue&type=style&index=0&id=05a21a22&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/LanguageSelector.vue?vue&type=style&index=0&id=05a21a22&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_style_index_0_id_05a21a22_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./LanguageSelector.vue?vue&type=style&index=0&id=05a21a22&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/LanguageSelector.vue?vue&type=style&index=0&id=05a21a22&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_style_index_0_id_05a21a22_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_style_index_0_id_05a21a22_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Layout.vue?vue&type=style&index=0&id=1de47a14&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Layout.vue?vue&type=style&index=0&id=1de47a14&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_style_index_0_id_1de47a14_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Layout.vue?vue&type=style&index=0&id=1de47a14&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Layout.vue?vue&type=style&index=0&id=1de47a14&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_style_index_0_id_1de47a14_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_style_index_0_id_1de47a14_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Menu.vue?vue&type=style&index=0&id=153a9e49&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Menu.vue?vue&type=style&index=0&id=153a9e49&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Menu_vue_vue_type_style_index_0_id_153a9e49_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Menu.vue?vue&type=style&index=0&id=153a9e49&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Menu.vue?vue&type=style&index=0&id=153a9e49&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Menu_vue_vue_type_style_index_0_id_153a9e49_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Menu_vue_vue_type_style_index_0_id_153a9e49_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/SiderBar.vue?vue&type=style&index=0&id=09107b82&scope=local&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/SiderBar.vue?vue&type=style&index=0&id=09107b82&scope=local&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SiderBar_vue_vue_type_style_index_0_id_09107b82_scope_local_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SiderBar.vue?vue&type=style&index=0&id=09107b82&scope=local&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/SiderBar.vue?vue&type=style&index=0&id=09107b82&scope=local&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SiderBar_vue_vue_type_style_index_0_id_09107b82_scope_local_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SiderBar_vue_vue_type_style_index_0_id_09107b82_scope_local_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/User.vue?vue&type=style&index=1&id=70a31f94&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/User.vue?vue&type=style&index=1&id=70a31f94&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_User_vue_vue_type_style_index_1_id_70a31f94_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./User.vue?vue&type=style&index=1&id=70a31f94&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/User.vue?vue&type=style&index=1&id=70a31f94&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_User_vue_vue_type_style_index_1_id_70a31f94_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_User_vue_vue_type_style_index_1_id_70a31f94_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/Components/Alert.vue":
/*!*******************************************!*\
  !*** ./resources/js/Components/Alert.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Alert_vue_vue_type_template_id_f21dafbe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Alert.vue?vue&type=template&id=f21dafbe& */ "./resources/js/Components/Alert.vue?vue&type=template&id=f21dafbe&");
/* harmony import */ var _Alert_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Alert.vue?vue&type=script&lang=js& */ "./resources/js/Components/Alert.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Alert_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Alert_vue_vue_type_template_id_f21dafbe___WEBPACK_IMPORTED_MODULE_0__.render,
  _Alert_vue_vue_type_template_id_f21dafbe___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Alert.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Icon.vue":
/*!******************************************!*\
  !*** ./resources/js/Components/Icon.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Icon_vue_vue_type_template_id_7b50d278___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Icon.vue?vue&type=template&id=7b50d278& */ "./resources/js/Components/Icon.vue?vue&type=template&id=7b50d278&");
/* harmony import */ var _Icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Icon.vue?vue&type=script&lang=js& */ "./resources/js/Components/Icon.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Icon_vue_vue_type_template_id_7b50d278___WEBPACK_IMPORTED_MODULE_0__.render,
  _Icon_vue_vue_type_template_id_7b50d278___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Icon.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Components/LanguageSelector.vue":
/*!******************************************************!*\
  !*** ./resources/js/Components/LanguageSelector.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _LanguageSelector_vue_vue_type_template_id_05a21a22_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LanguageSelector.vue?vue&type=template&id=05a21a22&scoped=true& */ "./resources/js/Components/LanguageSelector.vue?vue&type=template&id=05a21a22&scoped=true&");
/* harmony import */ var _LanguageSelector_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LanguageSelector.vue?vue&type=script&lang=js& */ "./resources/js/Components/LanguageSelector.vue?vue&type=script&lang=js&");
/* harmony import */ var _LanguageSelector_vue_vue_type_style_index_0_id_05a21a22_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LanguageSelector.vue?vue&type=style&index=0&id=05a21a22&scoped=true&lang=css& */ "./resources/js/Components/LanguageSelector.vue?vue&type=style&index=0&id=05a21a22&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _LanguageSelector_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LanguageSelector_vue_vue_type_template_id_05a21a22_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _LanguageSelector_vue_vue_type_template_id_05a21a22_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "05a21a22",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/LanguageSelector.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Layout/ContentHeader.vue":
/*!**********************************************************!*\
  !*** ./resources/js/Components/Layout/ContentHeader.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ContentHeader_vue_vue_type_template_id_31563b28___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContentHeader.vue?vue&type=template&id=31563b28& */ "./resources/js/Components/Layout/ContentHeader.vue?vue&type=template&id=31563b28&");
/* harmony import */ var _ContentHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContentHeader.vue?vue&type=script&lang=js& */ "./resources/js/Components/Layout/ContentHeader.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ContentHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ContentHeader_vue_vue_type_template_id_31563b28___WEBPACK_IMPORTED_MODULE_0__.render,
  _ContentHeader_vue_vue_type_template_id_31563b28___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Layout/ContentHeader.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Layout/DashFooter.vue":
/*!*******************************************************!*\
  !*** ./resources/js/Components/Layout/DashFooter.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DashFooter_vue_vue_type_template_id_11e69837___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DashFooter.vue?vue&type=template&id=11e69837& */ "./resources/js/Components/Layout/DashFooter.vue?vue&type=template&id=11e69837&");
/* harmony import */ var _DashFooter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DashFooter.vue?vue&type=script&lang=js& */ "./resources/js/Components/Layout/DashFooter.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DashFooter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DashFooter_vue_vue_type_template_id_11e69837___WEBPACK_IMPORTED_MODULE_0__.render,
  _DashFooter_vue_vue_type_template_id_11e69837___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Layout/DashFooter.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Layout/Header.vue":
/*!***************************************************!*\
  !*** ./resources/js/Components/Layout/Header.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Header_vue_vue_type_template_id_7f65f7f7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Header.vue?vue&type=template&id=7f65f7f7& */ "./resources/js/Components/Layout/Header.vue?vue&type=template&id=7f65f7f7&");
/* harmony import */ var _Header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header.vue?vue&type=script&lang=js& */ "./resources/js/Components/Layout/Header.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Header_vue_vue_type_template_id_7f65f7f7___WEBPACK_IMPORTED_MODULE_0__.render,
  _Header_vue_vue_type_template_id_7f65f7f7___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Layout/Header.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Layout/Layout.vue":
/*!***************************************************!*\
  !*** ./resources/js/Components/Layout/Layout.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Layout_vue_vue_type_template_id_1de47a14___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Layout.vue?vue&type=template&id=1de47a14& */ "./resources/js/Components/Layout/Layout.vue?vue&type=template&id=1de47a14&");
/* harmony import */ var _Layout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layout.vue?vue&type=script&lang=js& */ "./resources/js/Components/Layout/Layout.vue?vue&type=script&lang=js&");
/* harmony import */ var _Layout_vue_vue_type_style_index_0_id_1de47a14_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Layout.vue?vue&type=style&index=0&id=1de47a14&lang=css& */ "./resources/js/Components/Layout/Layout.vue?vue&type=style&index=0&id=1de47a14&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Layout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Layout_vue_vue_type_template_id_1de47a14___WEBPACK_IMPORTED_MODULE_0__.render,
  _Layout_vue_vue_type_template_id_1de47a14___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Layout/Layout.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Layout/Menu.vue":
/*!*************************************************!*\
  !*** ./resources/js/Components/Layout/Menu.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Menu_vue_vue_type_template_id_153a9e49___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Menu.vue?vue&type=template&id=153a9e49& */ "./resources/js/Components/Layout/Menu.vue?vue&type=template&id=153a9e49&");
/* harmony import */ var _Menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Menu.vue?vue&type=script&lang=js& */ "./resources/js/Components/Layout/Menu.vue?vue&type=script&lang=js&");
/* harmony import */ var _Menu_vue_vue_type_style_index_0_id_153a9e49_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Menu.vue?vue&type=style&index=0&id=153a9e49&lang=css& */ "./resources/js/Components/Layout/Menu.vue?vue&type=style&index=0&id=153a9e49&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Menu_vue_vue_type_template_id_153a9e49___WEBPACK_IMPORTED_MODULE_0__.render,
  _Menu_vue_vue_type_template_id_153a9e49___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Layout/Menu.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Layout/SiderBar.vue":
/*!*****************************************************!*\
  !*** ./resources/js/Components/Layout/SiderBar.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SiderBar_vue_vue_type_template_id_09107b82___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SiderBar.vue?vue&type=template&id=09107b82& */ "./resources/js/Components/Layout/SiderBar.vue?vue&type=template&id=09107b82&");
/* harmony import */ var _SiderBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SiderBar.vue?vue&type=script&lang=js& */ "./resources/js/Components/Layout/SiderBar.vue?vue&type=script&lang=js&");
/* harmony import */ var _SiderBar_vue_vue_type_style_index_0_id_09107b82_scope_local_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SiderBar.vue?vue&type=style&index=0&id=09107b82&scope=local&lang=css& */ "./resources/js/Components/Layout/SiderBar.vue?vue&type=style&index=0&id=09107b82&scope=local&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SiderBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SiderBar_vue_vue_type_template_id_09107b82___WEBPACK_IMPORTED_MODULE_0__.render,
  _SiderBar_vue_vue_type_template_id_09107b82___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Layout/SiderBar.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Layout/UserMenu.vue":
/*!*****************************************************!*\
  !*** ./resources/js/Components/Layout/UserMenu.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UserMenu_vue_vue_type_template_id_99248b98___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserMenu.vue?vue&type=template&id=99248b98& */ "./resources/js/Components/Layout/UserMenu.vue?vue&type=template&id=99248b98&");
/* harmony import */ var _UserMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserMenu.vue?vue&type=script&lang=js& */ "./resources/js/Components/Layout/UserMenu.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UserMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserMenu_vue_vue_type_template_id_99248b98___WEBPACK_IMPORTED_MODULE_0__.render,
  _UserMenu_vue_vue_type_template_id_99248b98___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Layout/UserMenu.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Pagination.vue":
/*!************************************************!*\
  !*** ./resources/js/Components/Pagination.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Pagination_vue_vue_type_template_id_0e1fe725___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pagination.vue?vue&type=template&id=0e1fe725& */ "./resources/js/Components/Pagination.vue?vue&type=template&id=0e1fe725&");
/* harmony import */ var _Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pagination.vue?vue&type=script&lang=js& */ "./resources/js/Components/Pagination.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Pagination_vue_vue_type_template_id_0e1fe725___WEBPACK_IMPORTED_MODULE_0__.render,
  _Pagination_vue_vue_type_template_id_0e1fe725___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Pagination.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Admin/ImportModal.vue":
/*!**************************************************!*\
  !*** ./resources/js/Pages/Admin/ImportModal.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ImportModal_vue_vue_type_template_id_0d212662___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImportModal.vue?vue&type=template&id=0d212662& */ "./resources/js/Pages/Admin/ImportModal.vue?vue&type=template&id=0d212662&");
/* harmony import */ var _ImportModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ImportModal.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Admin/ImportModal.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ImportModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ImportModal_vue_vue_type_template_id_0d212662___WEBPACK_IMPORTED_MODULE_0__.render,
  _ImportModal_vue_vue_type_template_id_0d212662___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Admin/ImportModal.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Admin/UpdateUser.vue":
/*!*************************************************!*\
  !*** ./resources/js/Pages/Admin/UpdateUser.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UpdateUser_vue_vue_type_template_id_78f15abd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UpdateUser.vue?vue&type=template&id=78f15abd& */ "./resources/js/Pages/Admin/UpdateUser.vue?vue&type=template&id=78f15abd&");
/* harmony import */ var _UpdateUser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UpdateUser.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Admin/UpdateUser.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UpdateUser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UpdateUser_vue_vue_type_template_id_78f15abd___WEBPACK_IMPORTED_MODULE_0__.render,
  _UpdateUser_vue_vue_type_template_id_78f15abd___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Admin/UpdateUser.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Admin/User.vue":
/*!*******************************************!*\
  !*** ./resources/js/Pages/Admin/User.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _User_vue_vue_type_template_id_70a31f94___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./User.vue?vue&type=template&id=70a31f94& */ "./resources/js/Pages/Admin/User.vue?vue&type=template&id=70a31f94&");
/* harmony import */ var _User_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./User.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Admin/User.vue?vue&type=script&lang=js&");
/* harmony import */ var _vueform_multiselect_themes_default_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vueform/multiselect/themes/default.css?vue&type=style&index=0&lang=css& */ "./node_modules/@vueform/multiselect/themes/default.css?vue&type=style&index=0&lang=css&");
/* harmony import */ var _User_vue_vue_type_style_index_1_id_70a31f94_lang_css___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./User.vue?vue&type=style&index=1&id=70a31f94&lang=css& */ "./resources/js/Pages/Admin/User.vue?vue&type=style&index=1&id=70a31f94&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;



/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _User_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _User_vue_vue_type_template_id_70a31f94___WEBPACK_IMPORTED_MODULE_0__.render,
  _User_vue_vue_type_template_id_70a31f94___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Admin/User.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Alert.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/Components/Alert.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Alert_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Alert.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Alert.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Alert_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Icon.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/Components/Icon.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Icon.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Icon.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/LanguageSelector.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/Components/LanguageSelector.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./LanguageSelector.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/LanguageSelector.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Layout/ContentHeader.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/Components/Layout/ContentHeader.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ContentHeader.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/ContentHeader.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Layout/DashFooter.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/Components/Layout/DashFooter.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DashFooter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DashFooter.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/DashFooter.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DashFooter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Layout/Header.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/Components/Layout/Header.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Header.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Header.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Layout/Layout.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/Components/Layout/Layout.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Layout.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Layout.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Layout/Menu.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/Components/Layout/Menu.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Menu.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Menu.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Layout/SiderBar.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/Components/Layout/SiderBar.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SiderBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SiderBar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/SiderBar.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SiderBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Layout/UserMenu.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/Components/Layout/UserMenu.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserMenu.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/UserMenu.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Pagination.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/Components/Pagination.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Pagination.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Pagination.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Pages/Admin/ImportModal.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/Pages/Admin/ImportModal.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ImportModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ImportModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/ImportModal.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ImportModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Pages/Admin/UpdateUser.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/Pages/Admin/UpdateUser.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateUser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UpdateUser.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/UpdateUser.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateUser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Pages/Admin/User.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/Pages/Admin/User.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_User_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./User.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/User.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_User_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Alert.vue?vue&type=template&id=f21dafbe&":
/*!**************************************************************************!*\
  !*** ./resources/js/Components/Alert.vue?vue&type=template&id=f21dafbe& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Alert_vue_vue_type_template_id_f21dafbe___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Alert_vue_vue_type_template_id_f21dafbe___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Alert_vue_vue_type_template_id_f21dafbe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Alert.vue?vue&type=template&id=f21dafbe& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Alert.vue?vue&type=template&id=f21dafbe&");


/***/ }),

/***/ "./resources/js/Components/Icon.vue?vue&type=template&id=7b50d278&":
/*!*************************************************************************!*\
  !*** ./resources/js/Components/Icon.vue?vue&type=template&id=7b50d278& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_template_id_7b50d278___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_template_id_7b50d278___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_template_id_7b50d278___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Icon.vue?vue&type=template&id=7b50d278& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Icon.vue?vue&type=template&id=7b50d278&");


/***/ }),

/***/ "./resources/js/Components/LanguageSelector.vue?vue&type=template&id=05a21a22&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/Components/LanguageSelector.vue?vue&type=template&id=05a21a22&scoped=true& ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_template_id_05a21a22_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_template_id_05a21a22_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_template_id_05a21a22_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./LanguageSelector.vue?vue&type=template&id=05a21a22&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/LanguageSelector.vue?vue&type=template&id=05a21a22&scoped=true&");


/***/ }),

/***/ "./resources/js/Components/Layout/ContentHeader.vue?vue&type=template&id=31563b28&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/Components/Layout/ContentHeader.vue?vue&type=template&id=31563b28& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentHeader_vue_vue_type_template_id_31563b28___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentHeader_vue_vue_type_template_id_31563b28___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentHeader_vue_vue_type_template_id_31563b28___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ContentHeader.vue?vue&type=template&id=31563b28& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/ContentHeader.vue?vue&type=template&id=31563b28&");


/***/ }),

/***/ "./resources/js/Components/Layout/DashFooter.vue?vue&type=template&id=11e69837&":
/*!**************************************************************************************!*\
  !*** ./resources/js/Components/Layout/DashFooter.vue?vue&type=template&id=11e69837& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DashFooter_vue_vue_type_template_id_11e69837___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DashFooter_vue_vue_type_template_id_11e69837___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DashFooter_vue_vue_type_template_id_11e69837___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DashFooter.vue?vue&type=template&id=11e69837& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/DashFooter.vue?vue&type=template&id=11e69837&");


/***/ }),

/***/ "./resources/js/Components/Layout/Header.vue?vue&type=template&id=7f65f7f7&":
/*!**********************************************************************************!*\
  !*** ./resources/js/Components/Layout/Header.vue?vue&type=template&id=7f65f7f7& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_template_id_7f65f7f7___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_template_id_7f65f7f7___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_template_id_7f65f7f7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Header.vue?vue&type=template&id=7f65f7f7& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Header.vue?vue&type=template&id=7f65f7f7&");


/***/ }),

/***/ "./resources/js/Components/Layout/Layout.vue?vue&type=template&id=1de47a14&":
/*!**********************************************************************************!*\
  !*** ./resources/js/Components/Layout/Layout.vue?vue&type=template&id=1de47a14& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_template_id_1de47a14___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_template_id_1de47a14___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_template_id_1de47a14___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Layout.vue?vue&type=template&id=1de47a14& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Layout.vue?vue&type=template&id=1de47a14&");


/***/ }),

/***/ "./resources/js/Components/Layout/Menu.vue?vue&type=template&id=153a9e49&":
/*!********************************************************************************!*\
  !*** ./resources/js/Components/Layout/Menu.vue?vue&type=template&id=153a9e49& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Menu_vue_vue_type_template_id_153a9e49___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Menu_vue_vue_type_template_id_153a9e49___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Menu_vue_vue_type_template_id_153a9e49___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Menu.vue?vue&type=template&id=153a9e49& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Menu.vue?vue&type=template&id=153a9e49&");


/***/ }),

/***/ "./resources/js/Components/Layout/SiderBar.vue?vue&type=template&id=09107b82&":
/*!************************************************************************************!*\
  !*** ./resources/js/Components/Layout/SiderBar.vue?vue&type=template&id=09107b82& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SiderBar_vue_vue_type_template_id_09107b82___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SiderBar_vue_vue_type_template_id_09107b82___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SiderBar_vue_vue_type_template_id_09107b82___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SiderBar.vue?vue&type=template&id=09107b82& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/SiderBar.vue?vue&type=template&id=09107b82&");


/***/ }),

/***/ "./resources/js/Components/Layout/UserMenu.vue?vue&type=template&id=99248b98&":
/*!************************************************************************************!*\
  !*** ./resources/js/Components/Layout/UserMenu.vue?vue&type=template&id=99248b98& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserMenu_vue_vue_type_template_id_99248b98___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserMenu_vue_vue_type_template_id_99248b98___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserMenu_vue_vue_type_template_id_99248b98___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserMenu.vue?vue&type=template&id=99248b98& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/UserMenu.vue?vue&type=template&id=99248b98&");


/***/ }),

/***/ "./resources/js/Components/Pagination.vue?vue&type=template&id=0e1fe725&":
/*!*******************************************************************************!*\
  !*** ./resources/js/Components/Pagination.vue?vue&type=template&id=0e1fe725& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_template_id_0e1fe725___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_template_id_0e1fe725___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Pagination_vue_vue_type_template_id_0e1fe725___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Pagination.vue?vue&type=template&id=0e1fe725& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Pagination.vue?vue&type=template&id=0e1fe725&");


/***/ }),

/***/ "./resources/js/Pages/Admin/ImportModal.vue?vue&type=template&id=0d212662&":
/*!*********************************************************************************!*\
  !*** ./resources/js/Pages/Admin/ImportModal.vue?vue&type=template&id=0d212662& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ImportModal_vue_vue_type_template_id_0d212662___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ImportModal_vue_vue_type_template_id_0d212662___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ImportModal_vue_vue_type_template_id_0d212662___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ImportModal.vue?vue&type=template&id=0d212662& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/ImportModal.vue?vue&type=template&id=0d212662&");


/***/ }),

/***/ "./resources/js/Pages/Admin/UpdateUser.vue?vue&type=template&id=78f15abd&":
/*!********************************************************************************!*\
  !*** ./resources/js/Pages/Admin/UpdateUser.vue?vue&type=template&id=78f15abd& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateUser_vue_vue_type_template_id_78f15abd___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateUser_vue_vue_type_template_id_78f15abd___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UpdateUser_vue_vue_type_template_id_78f15abd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UpdateUser.vue?vue&type=template&id=78f15abd& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/UpdateUser.vue?vue&type=template&id=78f15abd&");


/***/ }),

/***/ "./resources/js/Pages/Admin/User.vue?vue&type=template&id=70a31f94&":
/*!**************************************************************************!*\
  !*** ./resources/js/Pages/Admin/User.vue?vue&type=template&id=70a31f94& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_User_vue_vue_type_template_id_70a31f94___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_User_vue_vue_type_template_id_70a31f94___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_User_vue_vue_type_template_id_70a31f94___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./User.vue?vue&type=template&id=70a31f94& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/User.vue?vue&type=template&id=70a31f94&");


/***/ }),

/***/ "./node_modules/@vueform/multiselect/themes/default.css?vue&type=style&index=0&lang=css&":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@vueform/multiselect/themes/default.css?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_loader_dist_cjs_js_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_default_css_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../style-loader/dist/cjs.js!../../../css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../vue-loader/lib/loaders/stylePostLoader.js!../../../postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./default.css?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/@vueform/multiselect/themes/default.css?vue&type=style&index=0&lang=css&");


/***/ }),

/***/ "./resources/js/Components/LanguageSelector.vue?vue&type=style&index=0&id=05a21a22&scoped=true&lang=css&":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/Components/LanguageSelector.vue?vue&type=style&index=0&id=05a21a22&scoped=true&lang=css& ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_style_index_0_id_05a21a22_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./LanguageSelector.vue?vue&type=style&index=0&id=05a21a22&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/LanguageSelector.vue?vue&type=style&index=0&id=05a21a22&scoped=true&lang=css&");


/***/ }),

/***/ "./resources/js/Components/Layout/Layout.vue?vue&type=style&index=0&id=1de47a14&lang=css&":
/*!************************************************************************************************!*\
  !*** ./resources/js/Components/Layout/Layout.vue?vue&type=style&index=0&id=1de47a14&lang=css& ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Layout_vue_vue_type_style_index_0_id_1de47a14_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Layout.vue?vue&type=style&index=0&id=1de47a14&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Layout.vue?vue&type=style&index=0&id=1de47a14&lang=css&");


/***/ }),

/***/ "./resources/js/Components/Layout/Menu.vue?vue&type=style&index=0&id=153a9e49&lang=css&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/Components/Layout/Menu.vue?vue&type=style&index=0&id=153a9e49&lang=css& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Menu_vue_vue_type_style_index_0_id_153a9e49_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Menu.vue?vue&type=style&index=0&id=153a9e49&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/Menu.vue?vue&type=style&index=0&id=153a9e49&lang=css&");


/***/ }),

/***/ "./resources/js/Components/Layout/SiderBar.vue?vue&type=style&index=0&id=09107b82&scope=local&lang=css&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/Components/Layout/SiderBar.vue?vue&type=style&index=0&id=09107b82&scope=local&lang=css& ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SiderBar_vue_vue_type_style_index_0_id_09107b82_scope_local_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SiderBar.vue?vue&type=style&index=0&id=09107b82&scope=local&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Components/Layout/SiderBar.vue?vue&type=style&index=0&id=09107b82&scope=local&lang=css&");


/***/ }),

/***/ "./resources/js/Pages/Admin/User.vue?vue&type=style&index=1&id=70a31f94&lang=css&":
/*!****************************************************************************************!*\
  !*** ./resources/js/Pages/Admin/User.vue?vue&type=style&index=1&id=70a31f94&lang=css& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_User_vue_vue_type_style_index_1_id_70a31f94_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./User.vue?vue&type=style&index=1&id=70a31f94&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Admin/User.vue?vue&type=style&index=1&id=70a31f94&lang=css&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

}]);