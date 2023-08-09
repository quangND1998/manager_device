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

      this.sockets.subscribe("time-end-device.".concat(this.$page.props.auth.user.id, ":App\\Events\\TimeEndDeviceNotification"), function (data) {
        console.log(data);

        _this2.$swal("Device ".concat(data.device_name, " Timer Ends"), {
          icon: "warning",
          timer: 60000
        });
      });
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
/* harmony import */ var vue2_datepicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vue2-datepicker */ "./node_modules/vue2-datepicker/index.esm.js");
/* harmony import */ var vue2_datepicker_index_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vue2-datepicker/index.css */ "./node_modules/vue2-datepicker/index.css");
/* harmony import */ var process__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! process */ "./node_modules/process/browser.js");
/* harmony import */ var process__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(process__WEBPACK_IMPORTED_MODULE_11__);
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
    UpdateUser: _Pages_Admin_UpdateUser__WEBPACK_IMPORTED_MODULE_7__["default"],
    DatePicker: vue2_datepicker__WEBPACK_IMPORTED_MODULE_9__["default"]
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
    staticClass: "inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-red-400 hover:text-white hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out mx-2",
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
    staticClass: "inline-block px-6 py-2.5 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-lg transition duration-150 ease-in-out",
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
var render = function render() {};

var staticRenderFns = [];


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
    staticClass: "pl-0",
    attrs: {
      name: "Users"
    }
  }), _vm._v(" "), _c("alert", {
    attrs: {
      dismissible: true
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "my-5"
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
    staticClass: "appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-300 rounded py-4 px-3 mb-3 text-xl leading-tight focus:outline-none focus:bg-white",
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
    staticClass: "appearance-none block w-full bg-gray-200 text-gray-700 border text-xl border-gray-300 rounded py-4 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
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
    staticClass: "appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-300 rounded py-4 px-3 mb-3 text-xl leading-tight focus:outline-none focus:bg-white",
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
  }, [_vm._v(_vm._s(_vm.__("Time Limit")))]), _vm._v(" "), _c("date-picker", {
    attrs: {
      type: "datetime",
      placeholder: "Select datetime",
      "value-type": "YYYY-MM-DD HH:mm:ss"
    },
    model: {
      value: _vm.form.time_limit,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "time_limit", $$v);
      },
      expression: "form.time_limit"
    }
  }), _vm._v(" "), _vm.errors.time_limit ? _c("p", {
    staticClass: "text-red-500 text-xl italic"
  }, [_vm._v(_vm._s(_vm.errors.time_limit))]) : _vm._e()], 1), _vm._v(" "), _c("div", {
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
    staticClass: "appearance-none block w-full bg-gray-200 text-gray-700 border text-xl border-gray-300 rounded py-4 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
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
    staticClass: "inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-red-400 hover:text-white hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out mx-2",
    attrs: {
      type: "button",
      "data-dismiss": "modal"
    }
  }, [_vm._v("Close")]), _vm._v(" "), _c("button", {
    staticClass: "inline-block px-6 py-2.5 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-lg transition duration-150 ease-in-out",
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
    staticClass: "block w-full py-3 pl-5 text-xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500",
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
      staticClass: "inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out mx-2",
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
      staticClass: "inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-red-400 hover:text-white hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out",
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue2-datepicker/index.css":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue2-datepicker/index.css ***!
  \**********************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".mx-icon-left:before,.mx-icon-right:before,.mx-icon-double-left:before,.mx-icon-double-right:before,.mx-icon-double-left:after,.mx-icon-double-right:after{content:\"\";position:relative;top:-1px;display:inline-block;width:10px;height:10px;vertical-align:middle;border-style:solid;border-color:currentColor;border-width:2px 0 0 2px;border-radius:1px;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate(-45deg) scale(0.7);transform:rotate(-45deg) scale(0.7)}.mx-icon-double-left:after{left:-4px}.mx-icon-double-right:before{left:4px}.mx-icon-right:before,.mx-icon-double-right:before,.mx-icon-double-right:after{-webkit-transform:rotate(135deg) scale(0.7);transform:rotate(135deg) scale(0.7)}.mx-btn{-webkit-box-sizing:border-box;box-sizing:border-box;line-height:1;font-size:14px;font-weight:500;padding:7px 15px;margin:0;cursor:pointer;background-color:transparent;outline:none;border:1px solid rgba(0,0,0,.1);border-radius:4px;color:#73879c;white-space:nowrap}.mx-btn:hover{border-color:#1284e7;color:#1284e7}.mx-btn:disabled,.mx-btn.disabled{color:#ccc;cursor:not-allowed}.mx-btn-text{border:0;padding:0 4px;text-align:left;line-height:inherit}.mx-scrollbar{height:100%}.mx-scrollbar:hover .mx-scrollbar-track{opacity:1}.mx-scrollbar-wrap{height:100%;overflow-x:hidden;overflow-y:auto}.mx-scrollbar-track{position:absolute;top:2px;right:2px;bottom:2px;width:6px;z-index:1;border-radius:4px;opacity:0;-webkit-transition:opacity .24s ease-out;transition:opacity .24s ease-out}.mx-scrollbar-track .mx-scrollbar-thumb{position:absolute;width:100%;height:0;cursor:pointer;border-radius:inherit;background-color:rgba(144,147,153,.3);-webkit-transition:background-color .3s;transition:background-color .3s}.mx-zoom-in-down-enter-active,.mx-zoom-in-down-leave-active{opacity:1;-webkit-transform:scaleY(1);transform:scaleY(1);-webkit-transition:opacity .3s cubic-bezier(0.23, 1, 0.32, 1),-webkit-transform .3s cubic-bezier(0.23, 1, 0.32, 1);transition:opacity .3s cubic-bezier(0.23, 1, 0.32, 1),-webkit-transform .3s cubic-bezier(0.23, 1, 0.32, 1);transition:transform .3s cubic-bezier(0.23, 1, 0.32, 1),opacity .3s cubic-bezier(0.23, 1, 0.32, 1);transition:transform .3s cubic-bezier(0.23, 1, 0.32, 1),opacity .3s cubic-bezier(0.23, 1, 0.32, 1),-webkit-transform .3s cubic-bezier(0.23, 1, 0.32, 1);-webkit-transform-origin:center top;transform-origin:center top}.mx-zoom-in-down-enter,.mx-zoom-in-down-enter-from,.mx-zoom-in-down-leave-to{opacity:0;-webkit-transform:scaleY(0);transform:scaleY(0)}.mx-datepicker{position:relative;display:inline-block;width:210px}.mx-datepicker svg{width:1em;height:1em;vertical-align:-0.15em;fill:currentColor;overflow:hidden}.mx-datepicker-range{width:320px}.mx-datepicker-inline{width:auto}.mx-input-wrapper{position:relative}.mx-input{display:inline-block;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;height:34px;padding:6px 30px;padding-left:10px;font-size:14px;line-height:1.4;color:#555;background-color:#fff;border:1px solid #ccc;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.mx-input:hover,.mx-input:focus{border-color:#409aff}.mx-input:disabled,.mx-input.disabled{color:#ccc;background-color:#f3f3f3;border-color:#ccc;cursor:not-allowed}.mx-input:focus{outline:none}.mx-input::-ms-clear{display:none}.mx-icon-calendar,.mx-icon-clear{position:absolute;top:50%;right:8px;-webkit-transform:translateY(-50%);transform:translateY(-50%);font-size:16px;line-height:1;color:rgba(0,0,0,.5);vertical-align:middle}.mx-icon-clear{cursor:pointer}.mx-icon-clear:hover{color:rgba(0,0,0,.8)}.mx-datepicker-main{font:14px/1.5 \"Helvetica Neue\",Helvetica,Arial,\"Microsoft Yahei\",sans-serif;color:#73879c;background-color:#fff;border:1px solid #e8e8e8}.mx-datepicker-popup{position:absolute;margin-top:1px;margin-bottom:1px;-webkit-box-shadow:0 6px 12px rgba(0,0,0,.175);box-shadow:0 6px 12px rgba(0,0,0,.175);z-index:2001}.mx-datepicker-sidebar{float:left;-webkit-box-sizing:border-box;box-sizing:border-box;width:100px;padding:6px;overflow:auto}.mx-datepicker-sidebar+.mx-datepicker-content{margin-left:100px;border-left:1px solid #e8e8e8}.mx-datepicker-body{position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mx-btn-shortcut{display:block;padding:0 6px;line-height:24px}.mx-range-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex}@media(max-width: 750px){.mx-range-wrapper{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}}.mx-datepicker-header{padding:6px 8px;border-bottom:1px solid #e8e8e8}.mx-datepicker-footer{padding:6px 8px;text-align:right;border-top:1px solid #e8e8e8}.mx-calendar{-webkit-box-sizing:border-box;box-sizing:border-box;width:248px;padding:6px 12px}.mx-calendar+.mx-calendar{border-left:1px solid #e8e8e8}.mx-calendar-header,.mx-time-header{-webkit-box-sizing:border-box;box-sizing:border-box;height:34px;line-height:34px;text-align:center;overflow:hidden}.mx-btn-icon-left,.mx-btn-icon-double-left{float:left}.mx-btn-icon-right,.mx-btn-icon-double-right{float:right}.mx-calendar-header-label{font-size:14px}.mx-calendar-decade-separator{margin:0 2px}.mx-calendar-decade-separator:after{content:\"~\"}.mx-calendar-content{position:relative;height:224px;-webkit-box-sizing:border-box;box-sizing:border-box}.mx-calendar-content .cell{cursor:pointer}.mx-calendar-content .cell:hover{color:#73879c;background-color:#f3f9fe}.mx-calendar-content .cell.active{color:#fff;background-color:#1284e7}.mx-calendar-content .cell.in-range,.mx-calendar-content .cell.hover-in-range{color:#73879c;background-color:#dbedfb}.mx-calendar-content .cell.disabled{cursor:not-allowed;color:#ccc;background-color:#f3f3f3}.mx-calendar-week-mode .mx-date-row{cursor:pointer}.mx-calendar-week-mode .mx-date-row:hover{background-color:#f3f9fe}.mx-calendar-week-mode .mx-date-row.mx-active-week{background-color:#dbedfb}.mx-calendar-week-mode .mx-date-row .cell:hover{color:inherit;background-color:transparent}.mx-calendar-week-mode .mx-date-row .cell.active{color:inherit;background-color:transparent}.mx-week-number{opacity:.5}.mx-table{table-layout:fixed;border-collapse:separate;border-spacing:0;width:100%;height:100%;-webkit-box-sizing:border-box;box-sizing:border-box;text-align:center}.mx-table th{padding:0;font-weight:500;vertical-align:middle}.mx-table td{padding:0;vertical-align:middle}.mx-table-date td,.mx-table-date th{height:32px;font-size:12px}.mx-table-date .today{color:#2a90e9}.mx-table-date .cell.not-current-month{color:#ccc;background:none}.mx-time{-webkit-box-flex:1;-ms-flex:1;flex:1;width:224px;background:#fff}.mx-time+.mx-time{border-left:1px solid #e8e8e8}.mx-calendar-time{position:absolute;top:0;left:0;width:100%;height:100%}.mx-time-header{border-bottom:1px solid #e8e8e8}.mx-time-content{height:224px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.mx-time-columns{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:100%;overflow:hidden}.mx-time-column{-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative;border-left:1px solid #e8e8e8;text-align:center}.mx-time-column:first-child{border-left:0}.mx-time-column .mx-time-list{margin:0;padding:0;list-style:none}.mx-time-column .mx-time-list::after{content:\"\";display:block;height:192px}.mx-time-column .mx-time-item{cursor:pointer;font-size:12px;height:32px;line-height:32px}.mx-time-column .mx-time-item:hover{color:#73879c;background-color:#f3f9fe}.mx-time-column .mx-time-item.active{color:#1284e7;background-color:transparent;font-weight:700}.mx-time-column .mx-time-item.disabled{cursor:not-allowed;color:#ccc;background-color:#f3f3f3}.mx-time-option{cursor:pointer;padding:8px 10px;font-size:14px;line-height:20px}.mx-time-option:hover{color:#73879c;background-color:#f3f9fe}.mx-time-option.active{color:#1284e7;background-color:transparent;font-weight:700}.mx-time-option.disabled{cursor:not-allowed;color:#ccc;background-color:#f3f3f3}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


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

/***/ "./node_modules/date-format-parse/es/format.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-format-parse/es/format.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "format": () => (/* binding */ format)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./node_modules/date-format-parse/es/util.js");
/* harmony import */ var _locale_en__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./locale/en */ "./node_modules/date-format-parse/es/locale/en.js");


var REGEX_FORMAT = /\[([^\]]+)]|YYYY|YY?|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|Z{1,2}|S{1,3}|w{1,2}|x|X|a|A/g;

function pad(val) {
  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var output = "".concat(Math.abs(val));
  var sign = val < 0 ? '-' : '';

  while (output.length < len) {
    output = "0".concat(output);
  }

  return sign + output;
}

function getOffset(date) {
  return Math.round(date.getTimezoneOffset() / 15) * 15;
}

function formatTimezone(offset) {
  var delimeter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  return sign + pad(hours, 2) + delimeter + pad(minutes, 2);
}

var meridiem = function meridiem(h, _, isLowercase) {
  var word = h < 12 ? 'AM' : 'PM';
  return isLowercase ? word.toLocaleLowerCase() : word;
};

var formatFlags = {
  Y: function Y(date) {
    var y = date.getFullYear();
    return y <= 9999 ? "".concat(y) : "+".concat(y);
  },
  // Year: 00, 01, ..., 99
  YY: function YY(date) {
    return pad(date.getFullYear(), 4).substr(2);
  },
  // Year: 1900, 1901, ..., 2099
  YYYY: function YYYY(date) {
    return pad(date.getFullYear(), 4);
  },
  // Month: 1, 2, ..., 12
  M: function M(date) {
    return date.getMonth() + 1;
  },
  // Month: 01, 02, ..., 12
  MM: function MM(date) {
    return pad(date.getMonth() + 1, 2);
  },
  MMM: function MMM(date, locale) {
    return locale.monthsShort[date.getMonth()];
  },
  MMMM: function MMMM(date, locale) {
    return locale.months[date.getMonth()];
  },
  // Day of month: 1, 2, ..., 31
  D: function D(date) {
    return date.getDate();
  },
  // Day of month: 01, 02, ..., 31
  DD: function DD(date) {
    return pad(date.getDate(), 2);
  },
  // Hour: 0, 1, ... 23
  H: function H(date) {
    return date.getHours();
  },
  // Hour: 00, 01, ..., 23
  HH: function HH(date) {
    return pad(date.getHours(), 2);
  },
  // Hour: 1, 2, ..., 12
  h: function h(date) {
    var hours = date.getHours();

    if (hours === 0) {
      return 12;
    }

    if (hours > 12) {
      return hours % 12;
    }

    return hours;
  },
  // Hour: 01, 02, ..., 12
  hh: function hh() {
    var hours = formatFlags.h.apply(formatFlags, arguments);
    return pad(hours, 2);
  },
  // Minute: 0, 1, ..., 59
  m: function m(date) {
    return date.getMinutes();
  },
  // Minute: 00, 01, ..., 59
  mm: function mm(date) {
    return pad(date.getMinutes(), 2);
  },
  // Second: 0, 1, ..., 59
  s: function s(date) {
    return date.getSeconds();
  },
  // Second: 00, 01, ..., 59
  ss: function ss(date) {
    return pad(date.getSeconds(), 2);
  },
  // 1/10 of second: 0, 1, ..., 9
  S: function S(date) {
    return Math.floor(date.getMilliseconds() / 100);
  },
  // 1/100 of second: 00, 01, ..., 99
  SS: function SS(date) {
    return pad(Math.floor(date.getMilliseconds() / 10), 2);
  },
  // Millisecond: 000, 001, ..., 999
  SSS: function SSS(date) {
    return pad(date.getMilliseconds(), 3);
  },
  // Day of week: 0, 1, ..., 6
  d: function d(date) {
    return date.getDay();
  },
  // Day of week: 'Su', 'Mo', ..., 'Sa'
  dd: function dd(date, locale) {
    return locale.weekdaysMin[date.getDay()];
  },
  // Day of week: 'Sun', 'Mon',..., 'Sat'
  ddd: function ddd(date, locale) {
    return locale.weekdaysShort[date.getDay()];
  },
  // Day of week: 'Sunday', 'Monday', ...,'Saturday'
  dddd: function dddd(date, locale) {
    return locale.weekdays[date.getDay()];
  },
  // AM, PM
  A: function A(date, locale) {
    var meridiemFunc = locale.meridiem || meridiem;
    return meridiemFunc(date.getHours(), date.getMinutes(), false);
  },
  // am, pm
  a: function a(date, locale) {
    var meridiemFunc = locale.meridiem || meridiem;
    return meridiemFunc(date.getHours(), date.getMinutes(), true);
  },
  // Timezone: -01:00, +00:00, ... +12:00
  Z: function Z(date) {
    return formatTimezone(getOffset(date), ':');
  },
  // Timezone: -0100, +0000, ... +1200
  ZZ: function ZZ(date) {
    return formatTimezone(getOffset(date));
  },
  // Seconds timestamp: 512969520
  X: function X(date) {
    return Math.floor(date.getTime() / 1000);
  },
  // Milliseconds timestamp: 512969520900
  x: function x(date) {
    return date.getTime();
  },
  w: function w(date, locale) {
    return (0,_util__WEBPACK_IMPORTED_MODULE_0__.getWeek)(date, {
      firstDayOfWeek: locale.firstDayOfWeek,
      firstWeekContainsDate: locale.firstWeekContainsDate
    });
  },
  ww: function ww(date, locale) {
    return pad(formatFlags.w(date, locale), 2);
  }
};
function format(val, str) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var formatStr = str ? String(str) : 'YYYY-MM-DDTHH:mm:ss.SSSZ';
  var date = (0,_util__WEBPACK_IMPORTED_MODULE_0__.toDate)(val);

  if (!(0,_util__WEBPACK_IMPORTED_MODULE_0__.isValidDate)(date)) {
    return 'Invalid Date';
  }

  var locale = options.locale || _locale_en__WEBPACK_IMPORTED_MODULE_1__["default"];
  return formatStr.replace(REGEX_FORMAT, function (match, p1) {
    if (p1) {
      return p1;
    }

    if (typeof formatFlags[match] === 'function') {
      return "".concat(formatFlags[match](date, locale));
    }

    return match;
  });
}

/***/ }),

/***/ "./node_modules/date-format-parse/es/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-format-parse/es/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "format": () => (/* reexport safe */ _format__WEBPACK_IMPORTED_MODULE_0__.format),
/* harmony export */   "getWeek": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.getWeek),
/* harmony export */   "isDate": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.isDate),
/* harmony export */   "isValidDate": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.isValidDate),
/* harmony export */   "parse": () => (/* reexport safe */ _parse__WEBPACK_IMPORTED_MODULE_1__.parse),
/* harmony export */   "toDate": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_2__.toDate)
/* harmony export */ });
/* harmony import */ var _format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format */ "./node_modules/date-format-parse/es/format.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse */ "./node_modules/date-format-parse/es/parse.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./node_modules/date-format-parse/es/util.js");




/***/ }),

/***/ "./node_modules/date-format-parse/es/locale/en.js":
/*!********************************************************!*\
  !*** ./node_modules/date-format-parse/es/locale/en.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var locale = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  firstDayOfWeek: 0,
  firstWeekContainsDate: 1
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (locale);

/***/ }),

/***/ "./node_modules/date-format-parse/es/parse.js":
/*!****************************************************!*\
  !*** ./node_modules/date-format-parse/es/parse.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parse": () => (/* binding */ parse)
/* harmony export */ });
/* harmony import */ var _locale_en__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./locale/en */ "./node_modules/date-format-parse/es/locale/en.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./node_modules/date-format-parse/es/util.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var formattingTokens = /(\[[^\[]*\])|(MM?M?M?|Do|DD?|ddd?d?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|S{1,3}|x|X|ZZ?|.)/g;
var match1 = /\d/; // 0 - 9

var match2 = /\d\d/; // 00 - 99

var match3 = /\d{3}/; // 000 - 999

var match4 = /\d{4}/; // 0000 - 9999

var match1to2 = /\d\d?/; // 0 - 99

var matchShortOffset = /[+-]\d\d:?\d\d/; // +00:00 -00:00 +0000 or -0000

var matchSigned = /[+-]?\d+/; // -inf - inf

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123
// const matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i; // Word

var YEAR = 'year';
var MONTH = 'month';
var DAY = 'day';
var HOUR = 'hour';
var MINUTE = 'minute';
var SECOND = 'second';
var MILLISECOND = 'millisecond';
var parseFlags = {};

var addParseFlag = function addParseFlag(token, regex, callback) {
  var tokens = Array.isArray(token) ? token : [token];
  var func;

  if (typeof callback === 'string') {
    func = function func(input) {
      var value = parseInt(input, 10);
      return _defineProperty({}, callback, value);
    };
  } else {
    func = callback;
  }

  tokens.forEach(function (key) {
    parseFlags[key] = [regex, func];
  });
};

var escapeStringRegExp = function escapeStringRegExp(str) {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
};

var matchWordRegExp = function matchWordRegExp(localeKey) {
  return function (locale) {
    var array = locale[localeKey];

    if (!Array.isArray(array)) {
      throw new Error("Locale[".concat(localeKey, "] need an array"));
    }

    return new RegExp(array.map(escapeStringRegExp).join('|'));
  };
};

var matchWordCallback = function matchWordCallback(localeKey, key) {
  return function (input, locale) {
    var array = locale[localeKey];

    if (!Array.isArray(array)) {
      throw new Error("Locale[".concat(localeKey, "] need an array"));
    }

    var index = array.indexOf(input);

    if (index < 0) {
      throw new Error('Invalid Word');
    }

    return _defineProperty({}, key, index);
  };
};

addParseFlag('Y', matchSigned, YEAR);
addParseFlag('YY', match2, function (input) {
  var year = new Date().getFullYear();
  var cent = Math.floor(year / 100);
  var value = parseInt(input, 10);
  value = (value > 68 ? cent - 1 : cent) * 100 + value;
  return _defineProperty({}, YEAR, value);
});
addParseFlag('YYYY', match4, YEAR);
addParseFlag('M', match1to2, function (input) {
  return _defineProperty({}, MONTH, parseInt(input, 10) - 1);
});
addParseFlag('MM', match2, function (input) {
  return _defineProperty({}, MONTH, parseInt(input, 10) - 1);
});
addParseFlag('MMM', matchWordRegExp('monthsShort'), matchWordCallback('monthsShort', MONTH));
addParseFlag('MMMM', matchWordRegExp('months'), matchWordCallback('months', MONTH));
addParseFlag('D', match1to2, DAY);
addParseFlag('DD', match2, DAY);
addParseFlag(['H', 'h'], match1to2, HOUR);
addParseFlag(['HH', 'hh'], match2, HOUR);
addParseFlag('m', match1to2, MINUTE);
addParseFlag('mm', match2, MINUTE);
addParseFlag('s', match1to2, SECOND);
addParseFlag('ss', match2, SECOND);
addParseFlag('S', match1, function (input) {
  return _defineProperty({}, MILLISECOND, parseInt(input, 10) * 100);
});
addParseFlag('SS', match2, function (input) {
  return _defineProperty({}, MILLISECOND, parseInt(input, 10) * 10);
});
addParseFlag('SSS', match3, MILLISECOND);

function matchMeridiem(locale) {
  return locale.meridiemParse || /[ap]\.?m?\.?/i;
}

function defaultIsPM(input) {
  return "".concat(input).toLowerCase().charAt(0) === 'p';
}

addParseFlag(['A', 'a'], matchMeridiem, function (input, locale) {
  var isPM = typeof locale.isPM === 'function' ? locale.isPM(input) : defaultIsPM(input);
  return {
    isPM: isPM
  };
});

function offsetFromString(str) {
  var _ref8 = str.match(/([+-]|\d\d)/g) || ['-', '0', '0'],
      _ref9 = _slicedToArray(_ref8, 3),
      symbol = _ref9[0],
      hour = _ref9[1],
      minute = _ref9[2];

  var minutes = parseInt(hour, 10) * 60 + parseInt(minute, 10);

  if (minutes === 0) {
    return 0;
  }

  return symbol === '+' ? -minutes : +minutes;
}

addParseFlag(['Z', 'ZZ'], matchShortOffset, function (input) {
  return {
    offset: offsetFromString(input)
  };
});
addParseFlag('x', matchSigned, function (input) {
  return {
    date: new Date(parseInt(input, 10))
  };
});
addParseFlag('X', matchTimestamp, function (input) {
  return {
    date: new Date(parseFloat(input) * 1000)
  };
});
addParseFlag('d', match1, 'weekday');
addParseFlag('dd', matchWordRegExp('weekdaysMin'), matchWordCallback('weekdaysMin', 'weekday'));
addParseFlag('ddd', matchWordRegExp('weekdaysShort'), matchWordCallback('weekdaysShort', 'weekday'));
addParseFlag('dddd', matchWordRegExp('weekdays'), matchWordCallback('weekdays', 'weekday'));
addParseFlag('w', match1to2, 'week');
addParseFlag('ww', match2, 'week');

function to24hour(hour, isPM) {
  if (hour !== undefined && isPM !== undefined) {
    if (isPM) {
      if (hour < 12) {
        return hour + 12;
      }
    } else if (hour === 12) {
      return 0;
    }
  }

  return hour;
}

function getFullInputArray(input) {
  var backupDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var result = [0, 0, 1, 0, 0, 0, 0];
  var backupArr = [backupDate.getFullYear(), backupDate.getMonth(), backupDate.getDate(), backupDate.getHours(), backupDate.getMinutes(), backupDate.getSeconds(), backupDate.getMilliseconds()];
  var useBackup = true;

  for (var i = 0; i < 7; i++) {
    if (input[i] === undefined) {
      result[i] = useBackup ? backupArr[i] : result[i];
    } else {
      result[i] = input[i];
      useBackup = false;
    }
  }

  return result;
}

function createDate(y, m, d, h, M, s, ms) {
  var date;

  if (y < 100 && y >= 0) {
    date = new Date(y + 400, m, d, h, M, s, ms);

    if (isFinite(date.getFullYear())) {
      date.setFullYear(y);
    }
  } else {
    date = new Date(y, m, d, h, M, s, ms);
  }

  return date;
}

function createUTCDate() {
  var date;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var y = args[0];

  if (y < 100 && y >= 0) {
    args[0] += 400;
    date = new Date(Date.UTC.apply(Date, args)); // eslint-disable-next-line no-restricted-globals

    if (isFinite(date.getUTCFullYear())) {
      date.setUTCFullYear(y);
    }
  } else {
    date = new Date(Date.UTC.apply(Date, args));
  }

  return date;
}

function makeParser(dateString, format, locale) {
  var tokens = format.match(formattingTokens);

  if (!tokens) {
    throw new Error();
  }

  var length = tokens.length;
  var mark = {};

  for (var i = 0; i < length; i += 1) {
    var token = tokens[i];
    var parseTo = parseFlags[token];

    if (!parseTo) {
      var word = token.replace(/^\[|\]$/g, '');

      if (dateString.indexOf(word) === 0) {
        dateString = dateString.substr(word.length);
      } else {
        throw new Error('not match');
      }
    } else {
      var regex = typeof parseTo[0] === 'function' ? parseTo[0](locale) : parseTo[0];
      var parser = parseTo[1];
      var value = (regex.exec(dateString) || [])[0];
      var obj = parser(value, locale);
      mark = _objectSpread({}, mark, {}, obj);
      dateString = dateString.replace(value, '');
    }
  }

  return mark;
}

function parse(str, format) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  try {
    var _options$locale = options.locale,
        _locale = _options$locale === void 0 ? _locale_en__WEBPACK_IMPORTED_MODULE_0__["default"] : _options$locale,
        _options$backupDate = options.backupDate,
        backupDate = _options$backupDate === void 0 ? new Date() : _options$backupDate;

    var parseResult = makeParser(str, format, _locale);
    var year = parseResult.year,
        month = parseResult.month,
        day = parseResult.day,
        hour = parseResult.hour,
        minute = parseResult.minute,
        second = parseResult.second,
        millisecond = parseResult.millisecond,
        isPM = parseResult.isPM,
        date = parseResult.date,
        offset = parseResult.offset,
        weekday = parseResult.weekday,
        week = parseResult.week;

    if (date) {
      return date;
    }

    var inputArray = [year, month, day, hour, minute, second, millisecond];
    inputArray[3] = to24hour(inputArray[3], isPM); // check week

    if (week !== undefined && month === undefined && day === undefined) {
      // new Date(year, 3) make sure in current year
      var firstDate = (0,_util__WEBPACK_IMPORTED_MODULE_1__.startOfWeekYear)(year === undefined ? backupDate : new Date(year, 3), {
        firstDayOfWeek: _locale.firstDayOfWeek,
        firstWeekContainsDate: _locale.firstWeekContainsDate
      });
      return new Date(firstDate.getTime() + (week - 1) * 7 * 24 * 3600 * 1000);
    }

    var parsedDate;
    var result = getFullInputArray(inputArray, backupDate);

    if (offset !== undefined) {
      result[6] += offset * 60 * 1000;
      parsedDate = createUTCDate.apply(void 0, _toConsumableArray(result));
    } else {
      parsedDate = createDate.apply(void 0, _toConsumableArray(result));
    } // check weekday


    if (weekday !== undefined && parsedDate.getDay() !== weekday) {
      return new Date(NaN);
    }

    return parsedDate;
  } catch (e) {
    return new Date(NaN);
  }
}

/***/ }),

/***/ "./node_modules/date-format-parse/es/util.js":
/*!***************************************************!*\
  !*** ./node_modules/date-format-parse/es/util.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getWeek": () => (/* binding */ getWeek),
/* harmony export */   "isDate": () => (/* binding */ isDate),
/* harmony export */   "isValidDate": () => (/* binding */ isValidDate),
/* harmony export */   "startOfWeek": () => (/* binding */ startOfWeek),
/* harmony export */   "startOfWeekYear": () => (/* binding */ startOfWeekYear),
/* harmony export */   "toDate": () => (/* binding */ toDate)
/* harmony export */ });
function isDate(value) {
  return value instanceof Date || Object.prototype.toString.call(value) === '[object Date]';
}
function toDate(value) {
  if (isDate(value)) {
    return new Date(value.getTime());
  }

  if (value == null) {
    return new Date(NaN);
  }

  return new Date(value);
}
function isValidDate(value) {
  return isDate(value) && !isNaN(value.getTime());
}
function startOfWeek(value) {
  var firstDayOfWeek = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (!(firstDayOfWeek >= 0 && firstDayOfWeek <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6');
  }

  var date = toDate(value);
  var day = date.getDay();
  var diff = (day + 7 - firstDayOfWeek) % 7;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}
function startOfWeekYear(value) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$firstDayOfWeek = _ref.firstDayOfWeek,
      firstDayOfWeek = _ref$firstDayOfWeek === void 0 ? 0 : _ref$firstDayOfWeek,
      _ref$firstWeekContain = _ref.firstWeekContainsDate,
      firstWeekContainsDate = _ref$firstWeekContain === void 0 ? 1 : _ref$firstWeekContain;

  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7');
  }

  var date = toDate(value);
  var year = date.getFullYear();
  var firstDateOfFirstWeek = new Date(0);

  for (var i = year + 1; i >= year - 1; i--) {
    firstDateOfFirstWeek.setFullYear(i, 0, firstWeekContainsDate);
    firstDateOfFirstWeek.setHours(0, 0, 0, 0);
    firstDateOfFirstWeek = startOfWeek(firstDateOfFirstWeek, firstDayOfWeek);

    if (date.getTime() >= firstDateOfFirstWeek.getTime()) {
      break;
    }
  }

  return firstDateOfFirstWeek;
}
function getWeek(value) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$firstDayOfWeek = _ref2.firstDayOfWeek,
      firstDayOfWeek = _ref2$firstDayOfWeek === void 0 ? 0 : _ref2$firstDayOfWeek,
      _ref2$firstWeekContai = _ref2.firstWeekContainsDate,
      firstWeekContainsDate = _ref2$firstWeekContai === void 0 ? 1 : _ref2$firstWeekContai;

  var date = toDate(value);
  var firstDateOfThisWeek = startOfWeek(date, firstDayOfWeek);
  var firstDateOfFirstWeek = startOfWeekYear(date, {
    firstDayOfWeek: firstDayOfWeek,
    firstWeekContainsDate: firstWeekContainsDate
  });
  var diff = firstDateOfThisWeek.getTime() - firstDateOfFirstWeek.getTime();
  return Math.round(diff / (7 * 24 * 3600 * 1000)) + 1;
}

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

/***/ "./node_modules/vue2-datepicker/index.css":
/*!************************************************!*\
  !*** ./node_modules/vue2-datepicker/index.css ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_cjs_js_clonedRuleSet_10_use_1_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./index.css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue2-datepicker/index.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_index_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_index_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");

var script = {}


/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  script,
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


/***/ }),

/***/ "./node_modules/vue2-datepicker/index.esm.js":
/*!***************************************************!*\
  !*** ./node_modules/vue2-datepicker/index.esm.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var date_format_parse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-format-parse */ "./node_modules/date-format-parse/es/index.js");


function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _extends$1() {
  return _extends$1 = Object.assign || function (a) {
    for (var b, c = 1; c < arguments.length; c++) {
      for (var d in b = arguments[c], b) {
        Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
      }
    }

    return a;
  }, _extends$1.apply(this, arguments);
}

var normalMerge = ["attrs", "props", "domProps"],
    toArrayMerge = ["class", "style", "directives"],
    functionalMerge = ["on", "nativeOn"],
    mergeJsxProps = function mergeJsxProps(a) {
  return a.reduce(function (c, a) {
    for (var b in a) {
      if (!c[b]) c[b] = a[b];else if (-1 !== normalMerge.indexOf(b)) c[b] = _extends$1({}, c[b], a[b]);else if (-1 !== toArrayMerge.indexOf(b)) {
        var d = c[b] instanceof Array ? c[b] : [c[b]],
            e = a[b] instanceof Array ? a[b] : [a[b]];
        c[b] = d.concat(e);
      } else if (-1 !== functionalMerge.indexOf(b)) {
        for (var f in a[b]) {
          if (c[b][f]) {
            var g = c[b][f] instanceof Array ? c[b][f] : [c[b][f]],
                h = a[b][f] instanceof Array ? a[b][f] : [a[b][f]];
            c[b][f] = g.concat(h);
          } else c[b][f] = a[b][f];
        }
      } else if ("hook" == b) for (var i in a[b]) {
        c[b][i] = c[b][i] ? mergeFn(c[b][i], a[b][i]) : a[b][i];
      } else c[b] = a[b];
    }

    return c;
  }, {});
},
    mergeFn = function mergeFn(a, b) {
  return function () {
    a && a.apply(this, arguments), b && b.apply(this, arguments);
  };
};

var helper = mergeJsxProps;

// new Date(10, 0, 1) The year from 0 to 99 will be incremented by 1900 automatically.
function createDate(y) {
  var M = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var d = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var m = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var s = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  var ms = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
  var date = new Date(y, M, d, h, m, s, ms);

  if (y < 100 && y >= 0) {
    date.setFullYear(y);
  }

  return date;
}
function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}
function isValidRangeDate(date) {
  return Array.isArray(date) && date.length === 2 && date.every(isValidDate) && date[0] <= date[1];
}
function isValidDates(dates) {
  return Array.isArray(dates) && dates.every(isValidDate);
}
function getValidDate(value) {
  var date = new Date(value);

  if (isValidDate(date)) {
    return date;
  }

  for (var _len = arguments.length, backup = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    backup[_key - 1] = arguments[_key];
  }

  if (backup.length) {
    return getValidDate.apply(void 0, backup);
  }

  return new Date();
}
function startOfYear(value) {
  var date = new Date(value);
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}
function startOfMonth(value) {
  var date = new Date(value);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}
function startOfDay(value) {
  var date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}
function getCalendar(_ref) {
  var firstDayOfWeek = _ref.firstDayOfWeek,
      year = _ref.year,
      month = _ref.month;
  var arr = []; // change to the last day of the last month

  var calendar = createDate(year, month, 0);
  var lastDayInLastMonth = calendar.getDate(); // getDay() 0 is Sunday, 1 is Monday

  var firstDayInLastMonth = lastDayInLastMonth - (calendar.getDay() + 7 - firstDayOfWeek) % 7;

  for (var i = firstDayInLastMonth; i <= lastDayInLastMonth; i++) {
    arr.push(createDate(year, month, i - lastDayInLastMonth));
  } // change to the last day of the current month


  calendar.setMonth(month + 1, 0);
  var lastDayInCurrentMonth = calendar.getDate();

  for (var _i = 1; _i <= lastDayInCurrentMonth; _i++) {
    arr.push(createDate(year, month, _i));
  }

  var lastMonthLength = lastDayInLastMonth - firstDayInLastMonth + 1;
  var nextMonthLength = 6 * 7 - lastMonthLength - lastDayInCurrentMonth;

  for (var _i2 = 1; _i2 <= nextMonthLength; _i2++) {
    arr.push(createDate(year, month, lastDayInCurrentMonth + _i2));
  }

  return arr;
}
function setMonth(dirtyDate, dirtyMonth) {
  var date = new Date(dirtyDate);
  var month = typeof dirtyMonth === 'function' ? dirtyMonth(date.getMonth()) : Number(dirtyMonth);
  var year = date.getFullYear();
  var daysInMonth = createDate(year, month + 1, 0).getDate();
  var day = date.getDate();
  date.setMonth(month, Math.min(day, daysInMonth));
  return date;
}
function setYear(dirtyDate, dirtyYear) {
  var date = new Date(dirtyDate);
  var year = typeof dirtyYear === 'function' ? dirtyYear(date.getFullYear()) : dirtyYear;
  date.setFullYear(year);
  return date;
}
function assignTime(target, source) {
  var date = new Date(target);
  var time = new Date(source);
  date.setHours(time.getHours(), time.getMinutes(), time.getSeconds());
  return date;
}

/**
 * chunk the array
 * @param {Array} arr
 * @param {Number} size
 */
function chunk(arr, size) {
  if (!Array.isArray(arr)) {
    return [];
  }

  var result = [];
  var len = arr.length;
  var i = 0;
  size = size || len;

  while (i < len) {
    result.push(arr.slice(i, i += size));
  }

  return result;
}
/**
 * isObject
 * @param {*} obj
 * @returns {Boolean}
 */

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
/**
 * pick object
 * @param {Object} obj
 * @param {Array|String} props
 */

function pick(obj, props) {
  if (!isObject(obj)) return {};

  if (!Array.isArray(props)) {
    props = [props];
  }

  var res = {};
  props.forEach(function (prop) {
    if (prop in obj) {
      res[prop] = obj[prop];
    }
  });
  return res;
}
/**
 * deep merge two object without merging array
 * @param {object} target
 * @param {object} source
 */

function mergeDeep(target, source) {
  if (!isObject(target)) {
    return {};
  }

  var result = target;

  if (isObject(source)) {
    Object.keys(source).forEach(function (key) {
      var value = source[key];

      if (isObject(value) && isObject(target[key])) {
        value = mergeDeep(target[key], value);
      }

      result = _objectSpread2({}, result, _defineProperty({}, key, value));
    });
  }

  return result;
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var en = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var locale = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  firstDayOfWeek: 0,
  firstWeekContainsDate: 1
};
var _default = locale;
exports["default"] = _default;
module.exports = exports.default;
});

var en$1 = unwrapExports(en);

var lang = {
  formatLocale: en$1,
  yearFormat: 'YYYY',
  monthFormat: 'MMM',
  monthBeforeYear: true
};

var defaultLocale = 'en';
var locales = {};
locales[defaultLocale] = lang;
function locale(name, object, isLocal) {
  if (typeof name !== 'string') return locales[defaultLocale];
  var l = defaultLocale;

  if (locales[name]) {
    l = name;
  }

  if (object) {
    locales[name] = object;
    l = name;
  }

  if (!isLocal) {
    defaultLocale = l;
  }

  return locales[name] || locales[defaultLocale];
}
/**
 * get locale object
 * @param {string} name lang
 */

function getLocale(name) {
  return locale(name, null, true);
}

/* istanbul ignore file */
function rafThrottle(fn) {
  var isRunning = false;
  return function fnBinfRaf() {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (isRunning) return;
    isRunning = true;
    requestAnimationFrame(function () {
      isRunning = false;
      fn.apply(_this, args);
    });
  };
}

/**
 * get the hidden element width, height
 * @param {HTMLElement} element dom
 */
function getPopupElementSize(element) {
  var originalDisplay = element.style.display;
  var originalVisibility = element.style.visibility;
  element.style.display = 'block';
  element.style.visibility = 'hidden';
  var styles = window.getComputedStyle(element);
  var width = element.offsetWidth + parseInt(styles.marginLeft, 10) + parseInt(styles.marginRight, 10);
  var height = element.offsetHeight + parseInt(styles.marginTop, 10) + parseInt(styles.marginBottom, 10);
  element.style.display = originalDisplay;
  element.style.visibility = originalVisibility;
  return {
    width: width,
    height: height
  };
}
/**
 * get the popup position
 * @param {HTMLElement} el relative element
 * @param {Number} targetWidth target element's width
 * @param {Number} targetHeight target element's height
 * @param {Boolean} fixed
 */

function getRelativePosition(el, targetWidth, targetHeight, fixed) {
  var left = 0;
  var top = 0;
  var offsetX = 0;
  var offsetY = 0;
  var relativeRect = el.getBoundingClientRect();
  var dw = document.documentElement.clientWidth;
  var dh = document.documentElement.clientHeight;

  if (fixed) {
    offsetX = window.pageXOffset + relativeRect.left;
    offsetY = window.pageYOffset + relativeRect.top;
  }

  if (dw - relativeRect.left < targetWidth && relativeRect.right < targetWidth) {
    left = offsetX - relativeRect.left + 1;
  } else if (relativeRect.left + relativeRect.width / 2 <= dw / 2) {
    left = offsetX;
  } else {
    left = offsetX + relativeRect.width - targetWidth;
  }

  if (relativeRect.top <= targetHeight && dh - relativeRect.bottom <= targetHeight) {
    top = offsetY + dh - relativeRect.top - targetHeight;
  } else if (relativeRect.top + relativeRect.height / 2 <= dh / 2) {
    top = offsetY + relativeRect.height;
  } else {
    top = offsetY - targetHeight;
  }

  return {
    left: "".concat(left, "px"),
    top: "".concat(top, "px")
  };
}
function getScrollParent(node) {
  var until = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

  if (!node || node === until) {
    return null;
  }

  var style = function style(value, prop) {
    return getComputedStyle(value, null).getPropertyValue(prop);
  };

  var regex = /(auto|scroll)/;
  var scroll = regex.test(style(node, 'overflow') + style(node, 'overflow-y') + style(node, 'overflow-x'));
  return scroll ? node : getScrollParent(node.parentNode, until);
}

//
var script = {
  name: 'Popup',
  inject: {
    prefixClass: {
      default: 'mx'
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      top: '',
      left: ''
    };
  },
  watch: {
    visible: {
      immediate: true,
      handler: function handler(val) {
        var _this = this;

        this.$nextTick(function () {
          if (val) {
            _this.displayPopup();
          }
        });
      }
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    if (this.appendToBody) {
      document.body.appendChild(this.$el);
    }

    this._clickoutEvent = 'ontouchend' in document ? 'touchstart' : 'mousedown';
    document.addEventListener(this._clickoutEvent, this.handleClickOutside); // change the popup position when resize or scroll

    var relativeElement = this.$parent.$el;
    this._displayPopup = rafThrottle(function () {
      return _this2.displayPopup();
    });
    this._scrollParent = getScrollParent(relativeElement) || window;

    this._scrollParent.addEventListener('scroll', this._displayPopup);

    window.addEventListener('resize', this._displayPopup);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.appendToBody && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }

    document.removeEventListener(this._clickoutEvent, this.handleClickOutside);

    this._scrollParent.removeEventListener('scroll', this._displayPopup);

    window.removeEventListener('resize', this._displayPopup);
  },
  methods: {
    handleClickOutside: function handleClickOutside(evt) {
      if (!this.visible) return;
      var target = evt.target;
      var el = this.$el;

      if (el && !el.contains(target)) {
        this.$emit('clickoutside', evt);
      }
    },
    displayPopup: function displayPopup() {
      if (!this.visible) return;
      var popup = this.$el;
      var relativeElement = this.$parent.$el;
      var appendToBody = this.appendToBody;

      if (!this._popupRect) {
        this._popupRect = getPopupElementSize(popup);
      }

      var _this$_popupRect = this._popupRect,
          width = _this$_popupRect.width,
          height = _this$_popupRect.height;

      var _getRelativePosition = getRelativePosition(relativeElement, width, height, appendToBody),
          left = _getRelativePosition.left,
          top = _getRelativePosition.top;

      this.left = left;
      this.top = top;
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('transition', {
    attrs: {
      "name": _vm.prefixClass + "-zoom-in-down"
    }
  }, [_vm.visible ? _c('div', {
    class: _vm.prefixClass + "-datepicker-main " + _vm.prefixClass + "-datepicker-popup",
    style: {
      top: _vm.top,
      left: _vm.left,
      position: 'absolute'
    }
  }, [_vm._t("default")], 2) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

/* script */

/* template */
var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 1024 1024",
      "width": "1em",
      "height": "1em"
    }
  }, [_c('path', {
    attrs: {
      "d": "M940.218182 107.054545h-209.454546V46.545455h-65.163636v60.50909H363.054545V46.545455H297.890909v60.50909H83.781818c-18.618182 0-32.581818 13.963636-32.581818 32.581819v805.236363c0 18.618182 13.963636 32.581818 32.581818 32.581818h861.090909c18.618182 0 32.581818-13.963636 32.581818-32.581818V139.636364c-4.654545-18.618182-18.618182-32.581818-37.236363-32.581819zM297.890909 172.218182V232.727273h65.163636V172.218182h307.2V232.727273h65.163637V172.218182h176.872727v204.8H116.363636V172.218182h181.527273zM116.363636 912.290909V442.181818h795.927273v470.109091H116.363636z"
    }
  })]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, {}, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

/* script */

/* template */
var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 24 24",
      "width": "1em",
      "height": "1em"
    }
  }, [_c('path', {
    attrs: {
      "d": "M0 0h24v24H0z",
      "fill": "none"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"
    }
  })]);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = undefined;
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, {}, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

/* script */

/* template */
var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 1024 1024",
      "width": "1em",
      "height": "1em"
    }
  }, [_c('path', {
    attrs: {
      "d": "M810.005333 274.005333l-237.994667 237.994667 237.994667 237.994667-60.010667 60.010667-237.994667-237.994667-237.994667 237.994667-60.010667-60.010667 237.994667-237.994667-237.994667-237.994667 60.010667-60.010667 237.994667 237.994667 237.994667-237.994667z"
    }
  })]);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = undefined;
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, {}, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$1 = {
  props: {
    type: String,
    disabled: Boolean
  },
  inject: {
    prefixClass: {
      default: 'mx'
    }
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('button', _vm._g({
    class: [_vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-btn-icon-" + _vm.type, {
      disabled: _vm.disabled
    }],
    attrs: {
      "type": "button",
      "disabled": _vm.disabled
    }
  }, _vm.$listeners), [_c('i', {
    class: _vm.prefixClass + "-icon-" + _vm.type
  })]);
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = undefined;
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$1, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

var script$2 = {
  name: 'TableDate',
  components: {
    IconButton: __vue_component__$4
  },
  inject: {
    getLocale: {
      default: function _default() {
        return getLocale;
      }
    },
    getWeek: {
      default: function _default() {
        return date_format_parse__WEBPACK_IMPORTED_MODULE_0__.getWeek;
      }
    },
    prefixClass: {
      default: 'mx'
    },
    onDateMouseEnter: {
      default: undefined
    },
    onDateMouseLeave: {
      default: undefined
    }
  },
  props: {
    disabledCalendarChanger: {
      type: Function,
      default: function _default() {
        return false;
      }
    },
    calendar: {
      type: Date,
      default: function _default() {
        return new Date();
      }
    },
    showWeekNumber: {
      type: Boolean,
      default: false
    },
    titleFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    getRowClasses: {
      type: Function,
      default: function _default() {
        return [];
      }
    },
    getCellClasses: {
      type: Function,
      default: function _default() {
        return [];
      }
    }
  },
  computed: {
    firstDayOfWeek: function firstDayOfWeek() {
      return this.getLocale().formatLocale.firstDayOfWeek || 0;
    },
    yearMonth: function yearMonth() {
      var _this$getLocale = this.getLocale(),
          yearFormat = _this$getLocale.yearFormat,
          monthBeforeYear = _this$getLocale.monthBeforeYear,
          _this$getLocale$month = _this$getLocale.monthFormat,
          monthFormat = _this$getLocale$month === void 0 ? 'MMM' : _this$getLocale$month;

      var yearLabel = {
        panel: 'year',
        label: this.formatDate(this.calendar, yearFormat)
      };
      var monthLabel = {
        panel: 'month',
        label: this.formatDate(this.calendar, monthFormat)
      };
      return monthBeforeYear ? [monthLabel, yearLabel] : [yearLabel, monthLabel];
    },
    days: function days() {
      var locale = this.getLocale();
      var days = locale.days || locale.formatLocale.weekdaysMin;
      return days.concat(days).slice(this.firstDayOfWeek, this.firstDayOfWeek + 7);
    },
    dates: function dates() {
      var year = this.calendar.getFullYear();
      var month = this.calendar.getMonth();
      var arr = getCalendar({
        firstDayOfWeek: this.firstDayOfWeek,
        year: year,
        month: month
      });
      return chunk(arr, 7);
    }
  },
  methods: {
    isDisabledArrows: function isDisabledArrows(type) {
      var date = new Date(this.calendar);

      switch (type) {
        case 'last-year':
          date.setFullYear(date.getFullYear() - 1, date.getMonth() + 1, 0);
          date.setHours(23, 59, 59, 999);
          break;

        case 'next-year':
          date.setFullYear(date.getFullYear() + 1);
          break;

        case 'last-month':
          date.setMonth(date.getMonth(), 0);
          date.setHours(23, 59, 59, 999);
          break;

        case 'next-month':
          date.setMonth(date.getMonth() + 1);
          break;
      }

      return this.disabledCalendarChanger(date, type);
    },
    handleIconLeftClick: function handleIconLeftClick() {
      this.$emit('changecalendar', setMonth(this.calendar, function (v) {
        return v - 1;
      }), 'last-month');
    },
    handleIconRightClick: function handleIconRightClick() {
      this.$emit('changecalendar', setMonth(this.calendar, function (v) {
        return v + 1;
      }), 'next-month');
    },
    handleIconDoubleLeftClick: function handleIconDoubleLeftClick() {
      this.$emit('changecalendar', setYear(this.calendar, function (v) {
        return v - 1;
      }), 'last-year');
    },
    handleIconDoubleRightClick: function handleIconDoubleRightClick() {
      this.$emit('changecalendar', setYear(this.calendar, function (v) {
        return v + 1;
      }), 'next-year');
    },
    handlePanelChange: function handlePanelChange(panel) {
      this.$emit('changepanel', panel);
    },
    handleMouseEnter: function handleMouseEnter(cell) {
      if (typeof this.onDateMouseEnter === 'function') {
        this.onDateMouseEnter(cell);
      }
    },
    handleMouseLeave: function handleMouseLeave(cell) {
      if (typeof this.onDateMouseLeave === 'function') {
        this.onDateMouseLeave(cell);
      }
    },
    handleCellClick: function handleCellClick(evt) {
      var target = evt.target;

      if (target.tagName.toUpperCase() === 'DIV') {
        target = target.parentNode;
      }

      var index = target.getAttribute('data-row-col');

      if (index) {
        var _index$split$map = index.split(',').map(function (v) {
          return parseInt(v, 10);
        }),
            _index$split$map2 = _slicedToArray(_index$split$map, 2),
            row = _index$split$map2[0],
            col = _index$split$map2[1];

        var date = this.dates[row][col];
        this.$emit('select', new Date(date));
      }
    },
    formatDate: function formatDate(date, fmt) {
      return (0,date_format_parse__WEBPACK_IMPORTED_MODULE_0__.format)(date, fmt, {
        locale: this.getLocale().formatLocale
      });
    },
    getCellTitle: function getCellTitle(date) {
      var fmt = this.titleFormat;
      return this.formatDate(date, fmt);
    },
    getWeekNumber: function getWeekNumber(date) {
      return this.getWeek(date, this.getLocale().formatLocale);
    }
  }
};

/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.prefixClass + "-calendar " + _vm.prefixClass + "-calendar-panel-date"
  }, [_c('div', {
    class: _vm.prefixClass + "-calendar-header"
  }, [_c('icon-button', {
    attrs: {
      "type": "double-left",
      "disabled": _vm.isDisabledArrows('last-year')
    },
    on: {
      "click": _vm.handleIconDoubleLeftClick
    }
  }), _vm._v(" "), _c('icon-button', {
    attrs: {
      "type": "left",
      "disabled": _vm.isDisabledArrows('last-month')
    },
    on: {
      "click": _vm.handleIconLeftClick
    }
  }), _vm._v(" "), _c('icon-button', {
    attrs: {
      "type": "double-right",
      "disabled": _vm.isDisabledArrows('next-year')
    },
    on: {
      "click": _vm.handleIconDoubleRightClick
    }
  }), _vm._v(" "), _c('icon-button', {
    attrs: {
      "type": "right",
      "disabled": _vm.isDisabledArrows('next-month')
    },
    on: {
      "click": _vm.handleIconRightClick
    }
  }), _vm._v(" "), _c('span', {
    class: _vm.prefixClass + "-calendar-header-label"
  }, _vm._l(_vm.yearMonth, function (item) {
    return _c('button', {
      key: item.panel,
      class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-btn-current-" + item.panel,
      attrs: {
        "type": "button"
      },
      on: {
        "click": function click($event) {
          return _vm.handlePanelChange(item.panel);
        }
      }
    }, [_vm._v("\n        " + _vm._s(item.label) + "\n      ")]);
  }), 0)], 1), _vm._v(" "), _c('div', {
    class: _vm.prefixClass + "-calendar-content"
  }, [_c('table', {
    class: _vm.prefixClass + "-table " + _vm.prefixClass + "-table-date"
  }, [_c('thead', [_c('tr', [_vm.showWeekNumber ? _c('th', {
    class: _vm.prefixClass + "-week-number-header"
  }) : _vm._e(), _vm._v(" "), _vm._l(_vm.days, function (day) {
    return _c('th', {
      key: day
    }, [_vm._v(_vm._s(day))]);
  })], 2)]), _vm._v(" "), _c('tbody', {
    on: {
      "click": _vm.handleCellClick
    }
  }, _vm._l(_vm.dates, function (row, i) {
    return _c('tr', {
      key: i,
      class: [_vm.prefixClass + "-date-row", _vm.getRowClasses(row)]
    }, [_vm.showWeekNumber ? _c('td', {
      class: _vm.prefixClass + "-week-number",
      attrs: {
        "data-row-col": i + ",0"
      }
    }, [_vm._v("\n            " + _vm._s(_vm.getWeekNumber(row[0])) + "\n          ")]) : _vm._e(), _vm._v(" "), _vm._l(row, function (cell, j) {
      return _c('td', {
        key: j,
        staticClass: "cell",
        class: _vm.getCellClasses(cell),
        attrs: {
          "data-row-col": i + "," + j,
          "title": _vm.getCellTitle(cell)
        },
        on: {
          "mouseenter": function mouseenter($event) {
            return _vm.handleMouseEnter(cell);
          },
          "mouseleave": function mouseleave($event) {
            return _vm.handleMouseLeave(cell);
          }
        }
      }, [_c('div', [_vm._v(_vm._s(cell.getDate()))])]);
    })], 2);
  }), 0)])])]);
};

var __vue_staticRenderFns__$5 = [];
/* style */

var __vue_inject_styles__$5 = undefined;
/* scoped */

var __vue_scope_id__$5 = undefined;
/* module identifier */

var __vue_module_identifier__$5 = undefined;
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$5 = normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$2, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);

//
var script$3 = {
  name: 'TableMonth',
  components: {
    IconButton: __vue_component__$4
  },
  inject: {
    getLocale: {
      default: function _default() {
        return getLocale;
      }
    },
    prefixClass: {
      default: 'mx'
    }
  },
  props: {
    disabledCalendarChanger: {
      type: Function,
      default: function _default() {
        return false;
      }
    },
    calendar: {
      type: Date,
      default: function _default() {
        return new Date();
      }
    },
    getCellClasses: {
      type: Function,
      default: function _default() {
        return [];
      }
    }
  },
  computed: {
    calendarYear: function calendarYear() {
      return this.calendar.getFullYear();
    },
    months: function months() {
      var locale = this.getLocale();
      var monthsLocale = locale.months || locale.formatLocale.monthsShort;
      var months = monthsLocale.map(function (text, month) {
        return {
          text: text,
          month: month
        };
      });
      return chunk(months, 3);
    }
  },
  methods: {
    isDisabledArrows: function isDisabledArrows(type) {
      var date = new Date(this.calendar);

      switch (type) {
        case 'last-year':
          date.setFullYear(date.getFullYear() - 1, 11, 31);
          date.setHours(23, 59, 59, 999);
          break;

        case 'next-year':
          date.setFullYear(date.getFullYear() + 1, 0, 1);
          break;
      }

      return this.disabledCalendarChanger(date, type);
    },
    handleIconDoubleLeftClick: function handleIconDoubleLeftClick() {
      this.$emit('changecalendar', setYear(this.calendar, function (v) {
        return v - 1;
      }), 'last-year');
    },
    handleIconDoubleRightClick: function handleIconDoubleRightClick() {
      this.$emit('changecalendar', setYear(this.calendar, function (v) {
        return v + 1;
      }), 'next-year');
    },
    handlePanelChange: function handlePanelChange() {
      this.$emit('changepanel', 'year');
    },
    handleClick: function handleClick(evt) {
      var target = evt.target;

      if (target.tagName.toUpperCase() === 'DIV') {
        target = target.parentNode;
      }

      var month = target.getAttribute('data-month');

      if (month && !target.classList.contains('disabled')) {
        this.$emit('select', parseInt(month, 10));
      }
    }
  }
};

/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.prefixClass + "-calendar " + _vm.prefixClass + "-calendar-panel-month"
  }, [_c('div', {
    class: _vm.prefixClass + "-calendar-header"
  }, [_c('icon-button', {
    attrs: {
      "type": "double-left",
      "disabled": _vm.isDisabledArrows('last-year')
    },
    on: {
      "click": _vm.handleIconDoubleLeftClick
    }
  }), _vm._v(" "), _c('icon-button', {
    attrs: {
      "type": "double-right",
      "disabled": _vm.isDisabledArrows('next-year')
    },
    on: {
      "click": _vm.handleIconDoubleRightClick
    }
  }), _vm._v(" "), _c('span', {
    class: _vm.prefixClass + "-calendar-header-label"
  }, [_c('button', {
    class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.handlePanelChange
    }
  }, [_vm._v("\n        " + _vm._s(_vm.calendarYear) + "\n      ")])])], 1), _vm._v(" "), _c('div', {
    class: _vm.prefixClass + "-calendar-content"
  }, [_c('table', {
    class: _vm.prefixClass + "-table " + _vm.prefixClass + "-table-month",
    on: {
      "click": _vm.handleClick
    }
  }, _vm._l(_vm.months, function (row, i) {
    return _c('tr', {
      key: i
    }, _vm._l(row, function (cell, j) {
      return _c('td', {
        key: j,
        staticClass: "cell",
        class: _vm.getCellClasses(cell.month),
        attrs: {
          "data-month": cell.month
        }
      }, [_c('div', [_vm._v(_vm._s(cell.text))])]);
    }), 0);
  }), 0)])]);
};

var __vue_staticRenderFns__$6 = [];
/* style */

var __vue_inject_styles__$6 = undefined;
/* scoped */

var __vue_scope_id__$6 = undefined;
/* module identifier */

var __vue_module_identifier__$6 = undefined;
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$6 = normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$3, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);

//
var script$4 = {
  name: 'TableYear',
  components: {
    IconButton: __vue_component__$4
  },
  inject: {
    prefixClass: {
      default: 'mx'
    }
  },
  props: {
    disabledCalendarChanger: {
      type: Function,
      default: function _default() {
        return false;
      }
    },
    calendar: {
      type: Date,
      default: function _default() {
        return new Date();
      }
    },
    getCellClasses: {
      type: Function,
      default: function _default() {
        return [];
      }
    },
    getYearPanel: {
      type: Function
    }
  },
  computed: {
    years: function years() {
      var calendar = new Date(this.calendar);

      if (typeof this.getYearPanel === 'function') {
        return this.getYearPanel(calendar);
      }

      return this.getYears(calendar);
    },
    firstYear: function firstYear() {
      return this.years[0][0];
    },
    lastYear: function lastYear() {
      var last = function last(arr) {
        return arr[arr.length - 1];
      };

      return last(last(this.years));
    }
  },
  methods: {
    isDisabledArrows: function isDisabledArrows(type) {
      var date = new Date(this.calendar);

      switch (type) {
        case 'last-decade':
          date.setFullYear(this.firstYear - 1, 11, 31);
          date.setHours(23, 59, 59, 999);
          break;

        case 'next-decade':
          date.setFullYear(this.lastYear + 1, 0, 1);
          break;
      }

      return this.disabledCalendarChanger(date, type);
    },
    getYears: function getYears(calendar) {
      var firstYear = Math.floor(calendar.getFullYear() / 10) * 10;
      var years = [];

      for (var i = 0; i < 10; i++) {
        years.push(firstYear + i);
      }

      return chunk(years, 2);
    },
    handleIconDoubleLeftClick: function handleIconDoubleLeftClick() {
      this.$emit('changecalendar', setYear(this.calendar, function (v) {
        return v - 10;
      }), 'last-decade');
    },
    handleIconDoubleRightClick: function handleIconDoubleRightClick() {
      this.$emit('changecalendar', setYear(this.calendar, function (v) {
        return v + 10;
      }), 'next-decade');
    },
    handleClick: function handleClick(evt) {
      var target = evt.target;

      if (target.tagName.toUpperCase() === 'DIV') {
        target = target.parentNode;
      }

      var year = target.getAttribute('data-year');

      if (year && !target.classList.contains('disabled')) {
        this.$emit('select', parseInt(year, 10));
      }
    }
  }
};

/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$7 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.prefixClass + "-calendar " + _vm.prefixClass + "-calendar-panel-year"
  }, [_c('div', {
    class: _vm.prefixClass + "-calendar-header"
  }, [_c('icon-button', {
    attrs: {
      "type": "double-left",
      "disabled": _vm.isDisabledArrows('last-decade')
    },
    on: {
      "click": _vm.handleIconDoubleLeftClick
    }
  }), _vm._v(" "), _c('icon-button', {
    attrs: {
      "type": "double-right",
      "disabled": _vm.isDisabledArrows('next-decade')
    },
    on: {
      "click": _vm.handleIconDoubleRightClick
    }
  }), _vm._v(" "), _c('span', {
    class: _vm.prefixClass + "-calendar-header-label"
  }, [_c('span', [_vm._v(_vm._s(_vm.firstYear))]), _vm._v(" "), _c('span', {
    class: _vm.prefixClass + "-calendar-decade-separator"
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.lastYear))])])], 1), _vm._v(" "), _c('div', {
    class: _vm.prefixClass + "-calendar-content"
  }, [_c('table', {
    class: _vm.prefixClass + "-table " + _vm.prefixClass + "-table-year",
    on: {
      "click": _vm.handleClick
    }
  }, _vm._l(_vm.years, function (row, i) {
    return _c('tr', {
      key: i
    }, _vm._l(row, function (cell, j) {
      return _c('td', {
        key: j,
        staticClass: "cell",
        class: _vm.getCellClasses(cell),
        attrs: {
          "data-year": cell
        }
      }, [_c('div', [_vm._v(_vm._s(cell))])]);
    }), 0);
  }), 0)])]);
};

var __vue_staticRenderFns__$7 = [];
/* style */

var __vue_inject_styles__$7 = undefined;
/* scoped */

var __vue_scope_id__$7 = undefined;
/* module identifier */

var __vue_module_identifier__$7 = undefined;
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$7 = normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$4, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);

var CalendarPanel = {
  name: 'CalendarPanel',
  inject: {
    prefixClass: {
      default: 'mx'
    },
    dispatchDatePicker: {
      default: function _default() {
        return function () {};
      }
    }
  },
  props: {
    value: {},
    defaultValue: {
      default: function _default() {
        var date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
      }
    },
    defaultPanel: {
      type: String
    },
    disabledCalendarChanger: {
      type: Function,
      default: function _default() {
        return false;
      }
    },
    disabledDate: {
      type: Function,
      default: function _default() {
        return false;
      }
    },
    type: {
      type: String,
      default: 'date'
    },
    getClasses: {
      type: Function,
      default: function _default() {
        return [];
      }
    },
    showWeekNumber: {
      type: Boolean,
      default: undefined
    },
    getYearPanel: {
      type: Function
    },
    titleFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    calendar: Date,
    // update date when select year or month
    partialUpdate: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    var panels = ['date', 'month', 'year'];
    var index = Math.max(panels.indexOf(this.type), panels.indexOf(this.defaultPanel));
    var panel = index !== -1 ? panels[index] : 'date';
    return {
      panel: panel,
      innerCalendar: new Date()
    };
  },
  computed: {
    innerValue: function innerValue() {
      var value = Array.isArray(this.value) ? this.value : [this.value];
      var map = {
        year: startOfYear,
        month: startOfMonth,
        date: startOfDay
      };
      var start = map[this.type] || map.date;
      return value.filter(isValidDate).map(function (v) {
        return start(v);
      });
    },
    calendarYear: function calendarYear() {
      return this.innerCalendar.getFullYear();
    },
    calendarMonth: function calendarMonth() {
      return this.innerCalendar.getMonth();
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: 'initCalendar'
    },
    calendar: {
      handler: 'initCalendar'
    },
    defaultValue: {
      handler: 'initCalendar'
    }
  },
  methods: {
    initCalendar: function initCalendar() {
      var calendarDate = this.calendar;

      if (!isValidDate(calendarDate)) {
        var length = this.innerValue.length;
        calendarDate = getValidDate(length > 0 ? this.innerValue[length - 1] : this.defaultValue);
      }

      this.innerCalendar = startOfMonth(calendarDate);
    },
    isDisabled: function isDisabled(date) {
      return this.disabledDate(new Date(date), this.innerValue);
    },
    emitDate: function emitDate(date, type) {
      if (!this.isDisabled(date)) {
        this.$emit('select', date, type, this.innerValue); // someone need get the first selected date to set range value. (#429)

        this.dispatchDatePicker('pick', date, type);
      }
    },
    handleCalendarChange: function handleCalendarChange(calendar, type) {
      var oldCalendar = new Date(this.innerCalendar);
      this.innerCalendar = calendar;
      this.$emit('update:calendar', calendar);
      this.dispatchDatePicker('calendar-change', calendar, oldCalendar, type);
    },
    handelPanelChange: function handelPanelChange(panel) {
      var oldPanel = this.panel;
      this.panel = panel;
      this.dispatchDatePicker('panel-change', panel, oldPanel);
    },
    handleSelectYear: function handleSelectYear(year) {
      if (this.type === 'year') {
        var date = this.getYearCellDate(year);
        this.emitDate(date, 'year');
      } else {
        this.handleCalendarChange(createDate(year, this.calendarMonth), 'year');
        this.handelPanelChange('month');

        if (this.partialUpdate && this.innerValue.length === 1) {
          var _date = new Date(this.innerValue[0]);

          _date.setFullYear(year);

          this.emitDate(_date, 'year');
        }
      }
    },
    handleSelectMonth: function handleSelectMonth(month) {
      if (this.type === 'month') {
        var date = this.getMonthCellDate(month);
        this.emitDate(date, 'month');
      } else {
        this.handleCalendarChange(createDate(this.calendarYear, month), 'month');
        this.handelPanelChange('date');

        if (this.partialUpdate && this.innerValue.length === 1) {
          var _date2 = new Date(this.innerValue[0]);

          _date2.setFullYear(this.calendarYear);

          this.emitDate(setMonth(_date2, month), 'month');
        }
      }
    },
    handleSelectDate: function handleSelectDate(date) {
      this.emitDate(date, this.type === 'week' ? 'week' : 'date');
    },
    getMonthCellDate: function getMonthCellDate(month) {
      return createDate(this.calendarYear, month);
    },
    getYearCellDate: function getYearCellDate(year) {
      return createDate(year, 0);
    },
    getDateClasses: function getDateClasses(cellDate) {
      var notCurrentMonth = cellDate.getMonth() !== this.calendarMonth;
      var classes = [];

      if (cellDate.getTime() === new Date().setHours(0, 0, 0, 0)) {
        classes.push('today');
      }

      if (notCurrentMonth) {
        classes.push('not-current-month');
      }

      var state = this.getStateClass(cellDate);

      if (!(state === 'active' && notCurrentMonth)) {
        classes.push(state);
      }

      return classes.concat(this.getClasses(cellDate, this.innerValue, classes.join(' ')));
    },
    getMonthClasses: function getMonthClasses(month) {
      var classes = [];

      if (this.type !== 'month') {
        if (this.calendarMonth === month) {
          classes.push('active');
        }

        var _cellDate = this.getMonthCellDate(month);

        if (this.disabledCalendarChanger(_cellDate, 'month')) {
          classes.push('disabled');
        }

        return classes;
      }

      var cellDate = this.getMonthCellDate(month);
      classes.push(this.getStateClass(cellDate));
      return classes.concat(this.getClasses(cellDate, this.innerValue, classes.join(' ')));
    },
    getYearClasses: function getYearClasses(year) {
      var classes = [];

      if (this.type !== 'year') {
        if (this.calendarYear === year) {
          classes.push('active');
        }

        var _cellDate2 = this.getYearCellDate(year);

        if (this.disabledCalendarChanger(_cellDate2, 'year')) {
          classes.push('disabled');
        }

        return classes;
      }

      var cellDate = this.getYearCellDate(year);
      classes.push(this.getStateClass(cellDate));
      return classes.concat(this.getClasses(cellDate, this.innerValue, classes.join(' ')));
    },
    getStateClass: function getStateClass(cellDate) {
      if (this.isDisabled(cellDate)) {
        return 'disabled';
      }

      if (this.innerValue.some(function (v) {
        return v.getTime() === cellDate.getTime();
      })) {
        return 'active';
      }

      return '';
    },
    getWeekState: function getWeekState(row) {
      if (this.type !== 'week') return '';
      var start = row[0].getTime();
      var end = row[6].getTime();
      var active = this.innerValue.some(function (v) {
        var time = v.getTime();
        return time >= start && time <= end;
      });
      return active ? "".concat(this.prefixClass, "-active-week") : '';
    }
  },
  render: function render() {
    var h = arguments[0];
    var panel = this.panel,
        innerCalendar = this.innerCalendar;

    if (panel === 'year') {
      return h(__vue_component__$7, {
        "attrs": {
          "disabledCalendarChanger": this.disabledCalendarChanger,
          "calendar": innerCalendar,
          "getCellClasses": this.getYearClasses,
          "getYearPanel": this.getYearPanel
        },
        "on": {
          "select": this.handleSelectYear,
          "changecalendar": this.handleCalendarChange
        }
      });
    }

    if (panel === 'month') {
      return h(__vue_component__$6, {
        "attrs": {
          "disabledCalendarChanger": this.disabledCalendarChanger,
          "calendar": innerCalendar,
          "getCellClasses": this.getMonthClasses
        },
        "on": {
          "select": this.handleSelectMonth,
          "changepanel": this.handelPanelChange,
          "changecalendar": this.handleCalendarChange
        }
      });
    }

    return h(__vue_component__$5, {
      "attrs": {
        "disabledCalendarChanger": this.disabledCalendarChanger,
        "calendar": innerCalendar,
        "getCellClasses": this.getDateClasses,
        "getRowClasses": this.getWeekState,
        "titleFormat": this.titleFormat,
        "showWeekNumber": typeof this.showWeekNumber === 'boolean' ? this.showWeekNumber : this.type === 'week'
      },
      "class": _defineProperty({}, "".concat(this.prefixClass, "-calendar-week-mode"), this.type === 'week'),
      "on": {
        "select": this.handleSelectDate,
        "changepanel": this.handelPanelChange,
        "changecalendar": this.handleCalendarChange
      }
    });
  }
};

var CalendarRange = {
  name: 'CalendarRange',
  components: {
    CalendarPanel: CalendarPanel
  },
  provide: function provide() {
    return {
      onDateMouseEnter: this.onDateMouseEnter,
      onDateMouseLeave: this.onDateMouseLeave
    };
  },
  inject: {
    prefixClass: {
      default: 'mx'
    }
  },
  props: _objectSpread2({}, CalendarPanel.props),
  data: function data() {
    return {
      innerValue: [],
      calendars: [],
      hoveredValue: null
    };
  },
  computed: {
    // Minimum difference between start and end calendars
    calendarMinDiff: function calendarMinDiff() {
      var map = {
        date: 1,
        // type:date  min 1 month
        month: 1 * 12,
        // type:month min 1 year
        year: 10 * 12 // type:year  min 10 year

      };
      return map[this.type] || map.date;
    },
    calendarMaxDiff: function calendarMaxDiff() {
      return Infinity;
    },
    defaultValues: function defaultValues() {
      return Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue, this.defaultValue];
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function handler() {
        var _this = this;

        this.innerValue = isValidRangeDate(this.value) ? this.value : [new Date(NaN), new Date(NaN)];
        var calendars = this.innerValue.map(function (v, i) {
          return startOfMonth(getValidDate(v, _this.defaultValues[i]));
        });
        this.updateCalendars(calendars);
      }
    }
  },
  methods: {
    handleSelect: function handleSelect(date, type) {
      var _this$innerValue = _slicedToArray(this.innerValue, 2),
          startValue = _this$innerValue[0],
          endValue = _this$innerValue[1];

      if (isValidDate(startValue) && !isValidDate(endValue)) {
        if (startValue.getTime() > date.getTime()) {
          this.innerValue = [date, startValue];
        } else {
          this.innerValue = [startValue, date];
        }

        this.emitDate(this.innerValue, type);
      } else {
        this.innerValue = [date, new Date(NaN)];
      }
    },
    onDateMouseEnter: function onDateMouseEnter(cell) {
      this.hoveredValue = cell;
    },
    onDateMouseLeave: function onDateMouseLeave() {
      this.hoveredValue = null;
    },
    emitDate: function emitDate(dates, type) {
      this.$emit('select', dates, type);
    },
    updateStartCalendar: function updateStartCalendar(value) {
      this.updateCalendars([value, this.calendars[1]], 1);
    },
    updateEndCalendar: function updateEndCalendar(value) {
      this.updateCalendars([this.calendars[0], value], 0);
    },
    updateCalendars: function updateCalendars(calendars) {
      var adjustIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var gap = this.getCalendarGap(calendars);

      if (gap) {
        var calendar = new Date(calendars[adjustIndex]);
        calendar.setMonth(calendar.getMonth() + (adjustIndex === 0 ? -gap : gap));
        calendars[adjustIndex] = calendar;
      }

      this.calendars = calendars;
    },
    getCalendarGap: function getCalendarGap(calendars) {
      var _calendars = _slicedToArray(calendars, 2),
          calendarLeft = _calendars[0],
          calendarRight = _calendars[1];

      var yearDiff = calendarRight.getFullYear() - calendarLeft.getFullYear();
      var monthDiff = calendarRight.getMonth() - calendarLeft.getMonth();
      var diff = yearDiff * 12 + monthDiff;
      var min = this.calendarMinDiff;
      var max = this.calendarMaxDiff;

      if (diff < min) {
        return min - diff;
      }

      if (diff > max) {
        return max - diff;
      }

      return 0;
    },
    getRangeClasses: function getRangeClasses(cellDate, currentDates, classnames) {
      var classes = [].concat(this.getClasses(cellDate, currentDates, classnames));
      if (/disabled|active/.test(classnames)) return classes;

      var inRange = function inRange(data, range) {
        var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (v) {
          return v.getTime();
        };
        var value = fn(data);

        var _range$map = range.map(fn),
            _range$map2 = _slicedToArray(_range$map, 2),
            min = _range$map2[0],
            max = _range$map2[1];

        if (min > max) {
          var _ref = [max, min];
          min = _ref[0];
          max = _ref[1];
        }

        return value > min && value < max;
      };

      if (currentDates.length === 2 && inRange(cellDate, currentDates)) {
        return classes.concat('in-range');
      }

      if (currentDates.length === 1 && this.hoveredValue && inRange(cellDate, [currentDates[0], this.hoveredValue])) {
        return classes.concat('hover-in-range');
      }

      return classes;
    }
  },
  render: function render() {
    var _this2 = this;

    var h = arguments[0];
    var calendarRange = this.calendars.map(function (calendar, index) {
      var props = _objectSpread2({}, _this2.$props, {
        calendar: calendar,
        value: _this2.innerValue,
        defaultValue: _this2.defaultValues[index],
        getClasses: _this2.getRangeClasses,
        // don't update when range is true
        partialUpdate: false
      });

      var on = {
        select: _this2.handleSelect,
        'update:calendar': index === 0 ? _this2.updateStartCalendar : _this2.updateEndCalendar
      };
      return h("calendar-panel", {
        "props": _objectSpread2({}, props),
        "on": _objectSpread2({}, on)
      });
    });
    var prefixClass = this.prefixClass;
    return h("div", {
      "class": "".concat(prefixClass, "-range-wrapper")
    }, [calendarRange]);
  }
};

var scrollBarWidth;
function getScrollbarWidth () {
  if (typeof window === 'undefined') return 0;
  if (scrollBarWidth !== undefined) return scrollBarWidth;
  var outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);
  var inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);
  scrollBarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return scrollBarWidth;
}

//
var script$5 = {
  inject: {
    prefixClass: {
      default: 'mx'
    }
  },
  data: function data() {
    return {
      scrollbarWidth: 0,
      thumbTop: '',
      thumbHeight: ''
    };
  },
  created: function created() {
    this.scrollbarWidth = getScrollbarWidth();
    document.addEventListener('mouseup', this.handleDragend);
  },
  beforeDestroy: function beforeDestroy() {
    document.addEventListener('mouseup', this.handleDragend);
  },
  mounted: function mounted() {
    this.$nextTick(this.getThumbSize);
  },
  methods: {
    getThumbSize: function getThumbSize() {
      var wrap = this.$refs.wrap;
      if (!wrap) return;
      var heightPercentage = wrap.clientHeight * 100 / wrap.scrollHeight;
      this.thumbHeight = heightPercentage < 100 ? "".concat(heightPercentage, "%") : '';
    },
    handleScroll: function handleScroll(evt) {
      var el = evt.currentTarget;
      var scrollHeight = el.scrollHeight,
          scrollTop = el.scrollTop;
      this.thumbTop = "".concat(scrollTop * 100 / scrollHeight, "%");
    },
    handleDragstart: function handleDragstart(evt) {
      evt.stopImmediatePropagation();
      this._draggable = true;
      var offsetTop = this.$refs.thumb.offsetTop;
      this._prevY = evt.clientY - offsetTop;
      document.addEventListener('mousemove', this.handleDraging);
    },
    handleDraging: function handleDraging(evt) {
      if (!this._draggable) return;
      var clientY = evt.clientY;
      var wrap = this.$refs.wrap;
      var scrollHeight = wrap.scrollHeight,
          clientHeight = wrap.clientHeight;
      var offsetY = clientY - this._prevY;
      var top = offsetY * scrollHeight / clientHeight;
      wrap.scrollTop = top;
    },
    handleDragend: function handleDragend() {
      if (this._draggable) {
        this._draggable = false;
        document.removeEventListener('mousemove', this.handleDraging);
      }
    }
  }
};

/* script */
var __vue_script__$5 = script$5;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.prefixClass + "-scrollbar",
    style: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, [_c('div', {
    ref: "wrap",
    class: _vm.prefixClass + "-scrollbar-wrap",
    style: {
      marginRight: "-" + _vm.scrollbarWidth + "px"
    },
    on: {
      "scroll": _vm.handleScroll
    }
  }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
    class: _vm.prefixClass + "-scrollbar-track"
  }, [_c('div', {
    ref: "thumb",
    class: _vm.prefixClass + "-scrollbar-thumb",
    style: {
      height: _vm.thumbHeight,
      top: _vm.thumbTop
    },
    on: {
      "mousedown": _vm.handleDragstart
    }
  })])]);
};

var __vue_staticRenderFns__$8 = [];
/* style */

var __vue_inject_styles__$8 = undefined;
/* scoped */

var __vue_scope_id__$8 = undefined;
/* module identifier */

var __vue_module_identifier__$8 = undefined;
/* functional template */

var __vue_is_functional_template__$8 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$8 = normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$5, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);

//

var padNumber = function padNumber(value) {
  value = parseInt(value, 10);
  return value < 10 ? "0".concat(value) : "".concat(value);
};

var generateOptions = function generateOptions(length, step, options) {
  if (Array.isArray(options)) {
    return options.filter(function (v) {
      return v >= 0 && v < length;
    });
  }

  if (step <= 0) {
    step = 1;
  }

  var arr = [];

  for (var i = 0; i < length; i += step) {
    arr.push(i);
  }

  return arr;
};

var scrollTo = function scrollTo(element, to) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  // jump to target if duration zero
  if (duration <= 0) {
    requestAnimationFrame(function () {
      element.scrollTop = to;
    });
    return;
  }

  var difference = to - element.scrollTop;
  var tick = difference / duration * 10;
  requestAnimationFrame(function () {
    var scrollTop = element.scrollTop + tick;

    if (scrollTop >= to) {
      element.scrollTop = to;
      return;
    }

    element.scrollTop = scrollTop;
    scrollTo(element, to, duration - 10);
  });
};

var script$6 = {
  name: 'ListColumns',
  components: {
    ScrollbarVertical: __vue_component__$8
  },
  inject: {
    prefixClass: {
      default: 'mx'
    }
  },
  props: {
    date: Date,
    scrollDuration: {
      type: Number,
      default: 100
    },
    getClasses: {
      type: Function,
      default: function _default() {
        return [];
      }
    },
    hourOptions: Array,
    minuteOptions: Array,
    secondOptions: Array,
    showHour: {
      type: Boolean,
      default: true
    },
    showMinute: {
      type: Boolean,
      default: true
    },
    showSecond: {
      type: Boolean,
      default: true
    },
    hourStep: {
      type: Number,
      default: 1
    },
    minuteStep: {
      type: Number,
      default: 1
    },
    secondStep: {
      type: Number,
      default: 1
    },
    use12h: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    columns: function columns() {
      var cols = [];
      if (this.showHour) cols.push({
        type: 'hour',
        list: this.getHoursList()
      });
      if (this.showMinute) cols.push({
        type: 'minute',
        list: this.getMinutesList()
      });
      if (this.showSecond) cols.push({
        type: 'second',
        list: this.getSecondsList()
      });
      if (this.use12h) cols.push({
        type: 'ampm',
        list: this.getAMPMList()
      });
      return cols.filter(function (v) {
        return v.list.length > 0;
      });
    }
  },
  watch: {
    date: {
      handler: function handler() {
        var _this = this;

        this.$nextTick(function () {
          _this.scrollToSelected(_this.scrollDuration);
        });
      }
    }
  },
  mounted: function mounted() {
    this.scrollToSelected(0);
  },
  methods: {
    getHoursList: function getHoursList() {
      var _this2 = this;

      return generateOptions(this.use12h ? 12 : 24, this.hourStep, this.hourOptions).map(function (num) {
        var date = new Date(_this2.date);
        var text = padNumber(num);

        if (_this2.use12h) {
          if (num === 0) {
            text = '12';
          }

          if (date.getHours() >= 12) {
            num += 12;
          }
        }

        var value = date.setHours(num);
        return {
          value: value,
          text: text
        };
      });
    },
    getMinutesList: function getMinutesList() {
      var _this3 = this;

      return generateOptions(60, this.minuteStep, this.minuteOptions).map(function (num) {
        var value = new Date(_this3.date).setMinutes(num);
        return {
          value: value,
          text: padNumber(num)
        };
      });
    },
    getSecondsList: function getSecondsList() {
      var _this4 = this;

      return generateOptions(60, this.secondStep, this.secondOptions).map(function (num) {
        var value = new Date(_this4.date).setSeconds(num);
        return {
          value: value,
          text: padNumber(num)
        };
      });
    },
    getAMPMList: function getAMPMList() {
      var _this5 = this;

      return ['AM', 'PM'].map(function (text, i) {
        var date = new Date(_this5.date);
        var value = date.setHours(date.getHours() % 12 + i * 12);
        return {
          text: text,
          value: value
        };
      });
    },
    scrollToSelected: function scrollToSelected(duration) {
      var elements = this.$el.querySelectorAll('.active');

      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var scrollElement = getScrollParent(element, this.$el);

        if (scrollElement) {
          var to = element.offsetTop;
          scrollTo(scrollElement, to, duration);
        }
      }
    },
    handleSelect: function handleSelect(evt) {
      var target = evt.target,
          currentTarget = evt.currentTarget;
      if (target.tagName.toUpperCase() !== 'LI') return;
      var type = currentTarget.getAttribute('data-type');
      var colIndex = parseInt(currentTarget.getAttribute('data-index'), 10);
      var cellIndex = parseInt(target.getAttribute('data-index'), 10);
      var value = this.columns[colIndex].list[cellIndex].value;
      this.$emit('select', value, type);
    }
  }
};

/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$9 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.prefixClass + "-time-columns"
  }, _vm._l(_vm.columns, function (col, i) {
    return _c('scrollbar-vertical', {
      key: i,
      class: _vm.prefixClass + "-time-column"
    }, [_c('ul', {
      class: _vm.prefixClass + "-time-list",
      attrs: {
        "data-type": col.type,
        "data-index": i
      },
      on: {
        "click": _vm.handleSelect
      }
    }, _vm._l(col.list, function (item, j) {
      return _c('li', {
        key: item.value,
        class: [_vm.prefixClass + "-time-item", _vm.getClasses(item.value, col.type)],
        attrs: {
          "data-index": j
        }
      }, [_vm._v("\n        " + _vm._s(item.text) + "\n      ")]);
    }), 0)]);
  }), 1);
};

var __vue_staticRenderFns__$9 = [];
/* style */

var __vue_inject_styles__$9 = undefined;
/* scoped */

var __vue_scope_id__$9 = undefined;
/* module identifier */

var __vue_module_identifier__$9 = undefined;
/* functional template */

var __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$9 = normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$6, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);

//

function parseOption() {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var values = time.split(':');

  if (values.length >= 2) {
    var hours = parseInt(values[0], 10);
    var minutes = parseInt(values[1], 10);
    return {
      hours: hours,
      minutes: minutes
    };
  }

  return null;
}

var scrollTo$1 = function scrollTo(element, to) {
  if (element) {
    element.scrollTop = to;
  }
};

var script$7 = {
  name: 'ListOptions',
  components: {
    ScrollbarVertical: __vue_component__$8
  },
  inject: {
    getLocale: {
      default: function _default() {
        return getLocale;
      }
    },
    prefixClass: {
      default: 'mx'
    }
  },
  props: {
    date: Date,
    options: {
      type: [Object, Function],
      default: function _default() {
        return [];
      }
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    getClasses: {
      type: Function,
      default: function _default() {
        return [];
      }
    }
  },
  computed: {
    list: function list() {
      var result = [];
      var options = this.options;

      if (typeof options === 'function') {
        return options() || [];
      }

      var start = parseOption(options.start);
      var end = parseOption(options.end);
      var step = parseOption(options.step);
      var fmt = options.format || this.format;

      if (start && end && step) {
        var startMinutes = start.minutes + start.hours * 60;
        var endMinutes = end.minutes + end.hours * 60;
        var stepMinutes = step.minutes + step.hours * 60;
        var len = Math.floor((endMinutes - startMinutes) / stepMinutes);

        for (var i = 0; i <= len; i++) {
          var timeMinutes = startMinutes + i * stepMinutes;
          var hours = Math.floor(timeMinutes / 60);
          var minutes = timeMinutes % 60;
          var value = new Date(this.date).setHours(hours, minutes, 0);
          result.push({
            value: value,
            text: this.formatDate(value, fmt)
          });
        }
      }

      return result;
    }
  },
  mounted: function mounted() {
    this.scrollToSelected();
  },
  methods: {
    formatDate: function formatDate(date, fmt) {
      return (0,date_format_parse__WEBPACK_IMPORTED_MODULE_0__.format)(date, fmt, {
        locale: this.getLocale().formatLocale
      });
    },
    scrollToSelected: function scrollToSelected() {
      var element = this.$el.querySelector('.active');
      if (!element) return;
      var scrollElement = getScrollParent(element, this.$el);
      if (!scrollElement) return;
      var to = element.offsetTop;
      scrollTo$1(scrollElement, to);
    },
    handleSelect: function handleSelect(value) {
      this.$emit('select', value, 'time');
    }
  }
};

/* script */
var __vue_script__$7 = script$7;
/* template */

var __vue_render__$a = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('scrollbar-vertical', _vm._l(_vm.list, function (item) {
    return _c('div', {
      key: item.value,
      class: [_vm.prefixClass + "-time-option", _vm.getClasses(item.value)],
      on: {
        "click": function click($event) {
          return _vm.handleSelect(item.value);
        }
      }
    }, [_vm._v("\n    " + _vm._s(item.text) + "\n  ")]);
  }), 0);
};

var __vue_staticRenderFns__$a = [];
/* style */

var __vue_inject_styles__$a = undefined;
/* scoped */

var __vue_scope_id__$a = undefined;
/* module identifier */

var __vue_module_identifier__$a = undefined;
/* functional template */

var __vue_is_functional_template__$a = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$a = normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$7, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);

//
var script$8 = {
  name: 'TimePanel',
  components: {
    ListColumns: __vue_component__$9,
    ListOptions: __vue_component__$a
  },
  inject: {
    getLocale: {
      default: function _default() {
        return getLocale;
      }
    },
    prefixClass: {
      default: 'mx'
    }
  },
  props: {
    value: {},
    defaultValue: {
      default: function _default() {
        var date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
      }
    },
    format: {
      default: 'HH:mm:ss'
    },
    timeTitleFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    showTimeHeader: {
      type: Boolean,
      default: false
    },
    disabledTime: {
      type: Function,
      default: function _default() {
        return false;
      }
    },
    timePickerOptions: {
      type: [Object, Function],
      default: function _default() {
        return null;
      }
    },
    hourOptions: Array,
    minuteOptions: Array,
    secondOptions: Array,
    hourStep: {
      type: Number,
      default: 1
    },
    minuteStep: {
      type: Number,
      default: 1
    },
    secondStep: {
      type: Number,
      default: 1
    },
    showHour: {
      type: Boolean,
      default: undefined
    },
    showMinute: {
      type: Boolean,
      default: undefined
    },
    showSecond: {
      type: Boolean,
      default: undefined
    },
    use12h: {
      type: Boolean,
      default: undefined
    },
    scrollDuration: {
      type: Number,
      default: 100
    }
  },
  data: function data() {
    return {
      innerValue: getValidDate(this.value, this.defaultValue)
    };
  },
  computed: {
    title: function title() {
      var titleFormat = this.timeTitleFormat;
      var date = new Date(this.innerValue);
      return this.formatDate(date, titleFormat);
    },
    innerForamt: function innerForamt() {
      return typeof this.format === 'string' ? this.format : 'HH:mm:ss';
    },
    ShowHourMinuteSecondAMPM: function ShowHourMinuteSecondAMPM() {
      var _this = this;

      var fmt = this.innerForamt;
      var defaultProps = {
        showHour: /[HhKk]/.test(fmt),
        showMinute: /m/.test(fmt),
        showSecond: /s/.test(fmt),
        use12h: /a/i.test(fmt)
      };
      var obj = {};
      Object.keys(defaultProps).forEach(function (key) {
        obj[key] = typeof _this[key] === 'boolean' ? _this[key] : defaultProps[key];
      });
      return obj;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function handler() {
        this.innerValue = getValidDate(this.value, this.defaultValue);
      }
    }
  },
  methods: {
    formatDate: function formatDate(date, fmt) {
      return (0,date_format_parse__WEBPACK_IMPORTED_MODULE_0__.format)(date, fmt, {
        locale: this.getLocale().formatLocale
      });
    },
    isDisabledTime: function isDisabledTime(value) {
      return this.disabledTime(new Date(value));
    },
    isDisabledHour: function isDisabledHour(date) {
      var value = new Date(date);
      return this.isDisabledTime(value) && this.isDisabledTime(value.setMinutes(0, 0, 0)) && this.isDisabledTime(value.setMinutes(59, 59, 999));
    },
    isDisabledMinute: function isDisabledMinute(date) {
      var value = new Date(date);
      return this.isDisabledTime(value) && this.isDisabledTime(value.setSeconds(0, 0)) && this.isDisabledTime(value.setSeconds(59, 999));
    },
    isDisabledAMPM: function isDisabledAMPM(date) {
      var value = new Date(date);
      var minHour = value.getHours() < 12 ? 0 : 12;
      var maxHour = minHour + 11;
      return this.isDisabledTime(value) && this.isDisabledTime(value.setHours(minHour, 0, 0, 0)) && this.isDisabledTime(value.setHours(maxHour, 59, 59, 999));
    },
    isDisabled: function isDisabled(date, type) {
      if (type === 'hour') {
        return this.isDisabledHour(date);
      }

      if (type === 'minute') {
        return this.isDisabledMinute(date);
      }

      if (type === 'ampm') {
        return this.isDisabledAMPM(date);
      }

      return this.isDisabledTime(date);
    },
    handleSelect: function handleSelect(value, type) {
      var date = new Date(value);

      if (!this.isDisabled(value, type)) {
        this.innerValue = date;

        if (!this.isDisabledTime(date)) {
          this.$emit('select', date, type);
        }
      }
    },
    handleClickTitle: function handleClickTitle() {
      this.$emit('clicktitle');
    },
    getClasses: function getClasses(value, type) {
      var cellDate = new Date(value);

      if (this.isDisabled(value, type)) {
        return 'disabled';
      }

      if (cellDate.getTime() === this.innerValue.getTime()) {
        return 'active';
      }

      return '';
    }
  }
};

/* script */
var __vue_script__$8 = script$8;
/* template */

var __vue_render__$b = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.prefixClass + "-time"
  }, [_vm.showTimeHeader ? _c('div', {
    class: _vm.prefixClass + "-time-header"
  }, [_c('button', {
    class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-time-header-title",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.handleClickTitle
    }
  }, [_vm._v("\n      " + _vm._s(_vm.title) + "\n    ")])]) : _vm._e(), _vm._v(" "), _c('div', {
    class: _vm.prefixClass + "-time-content"
  }, [_vm.timePickerOptions ? _c('list-options', {
    attrs: {
      "date": _vm.innerValue,
      "get-classes": _vm.getClasses,
      "options": _vm.timePickerOptions,
      "format": _vm.innerForamt
    },
    on: {
      "select": _vm.handleSelect
    }
  }) : _c('list-columns', _vm._b({
    attrs: {
      "date": _vm.innerValue,
      "get-classes": _vm.getClasses,
      "hour-options": _vm.hourOptions,
      "minute-options": _vm.minuteOptions,
      "second-options": _vm.secondOptions,
      "hour-step": _vm.hourStep,
      "minute-step": _vm.minuteStep,
      "second-step": _vm.secondStep,
      "scroll-duration": _vm.scrollDuration
    },
    on: {
      "select": _vm.handleSelect
    }
  }, 'list-columns', _vm.ShowHourMinuteSecondAMPM, false))], 1)]);
};

var __vue_staticRenderFns__$b = [];
/* style */

var __vue_inject_styles__$b = undefined;
/* scoped */

var __vue_scope_id__$b = undefined;
/* module identifier */

var __vue_module_identifier__$b = undefined;
/* functional template */

var __vue_is_functional_template__$b = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$b = normalizeComponent({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$8, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, undefined, undefined, undefined);

var TimeRange = {
  name: 'TimeRange',
  inject: {
    prefixClass: {
      default: 'mx'
    }
  },
  props: _objectSpread2({}, __vue_component__$b.props),
  data: function data() {
    return {
      startValue: new Date(NaN),
      endValue: new Date(NaN)
    };
  },
  watch: {
    value: {
      immediate: true,
      handler: function handler() {
        if (isValidRangeDate(this.value)) {
          var _this$value = _slicedToArray(this.value, 2),
              startValue = _this$value[0],
              endValue = _this$value[1];

          this.startValue = startValue;
          this.endValue = endValue;
        } else {
          this.startValue = new Date(NaN);
          this.endValue = new Date(NaN);
        }
      }
    }
  },
  methods: {
    emitChange: function emitChange(type, index) {
      var date = [this.startValue, this.endValue];
      this.$emit('select', date, type === 'time' ? 'time-range' : type, index);
    },
    handleSelectStart: function handleSelectStart(date, type) {
      this.startValue = date; // check the NaN

      if (!(this.endValue.getTime() >= date.getTime())) {
        this.endValue = date;
      }

      this.emitChange(type, 0);
    },
    handleSelectEnd: function handleSelectEnd(date, type) {
      // check the NaN
      this.endValue = date;

      if (!(this.startValue.getTime() <= date.getTime())) {
        this.startValue = date;
      }

      this.emitChange(type, 1);
    },
    disabledStartTime: function disabledStartTime(date) {
      return this.disabledTime(date, 0);
    },
    disabledEndTime: function disabledEndTime(date) {
      return date.getTime() < this.startValue.getTime() || this.disabledTime(date, 1);
    }
  },
  render: function render() {
    var h = arguments[0];
    var defaultValues = Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue, this.defaultValue];
    var prefixClass = this.prefixClass;
    return h("div", {
      "class": "".concat(prefixClass, "-range-wrapper")
    }, [h(__vue_component__$b, {
      "props": _objectSpread2({}, _objectSpread2({}, this.$props, {
        value: this.startValue,
        defaultValue: defaultValues[0],
        disabledTime: this.disabledStartTime
      })),
      "on": _objectSpread2({}, _objectSpread2({}, this.$listeners, {
        select: this.handleSelectStart
      }))
    }), h(__vue_component__$b, {
      "props": _objectSpread2({}, _objectSpread2({}, this.$props, {
        value: this.endValue,
        defaultValue: defaultValues[1],
        disabledTime: this.disabledEndTime
      })),
      "on": _objectSpread2({}, _objectSpread2({}, this.$listeners, {
        select: this.handleSelectEnd
      }))
    })]);
  }
};

var DatetimePanel = {
  name: 'DatetimePanel',
  inject: {
    prefixClass: {
      default: 'mx'
    }
  },
  emits: ['select', 'update:show-time-panel'],
  props: _objectSpread2({}, CalendarPanel.props, {}, __vue_component__$b.props, {
    showTimePanel: {
      type: Boolean,
      default: undefined
    }
  }),
  data: function data() {
    return {
      defaultTimeVisible: false,
      currentValue: this.value
    };
  },
  computed: {
    timeVisible: function timeVisible() {
      return typeof this.showTimePanel === 'boolean' ? this.showTimePanel : this.defaultTimeVisible;
    }
  },
  watch: {
    value: function value(val) {
      this.currentValue = val;
    }
  },
  methods: {
    closeTimePanel: function closeTimePanel() {
      this.defaultTimeVisible = false;
      this.$emit('update:show-time-panel', false);
    },
    openTimePanel: function openTimePanel() {
      this.defaultTimeVisible = true;
      this.$emit('update:show-time-panel', true);
    },
    emitDate: function emitDate(date, type) {
      this.$emit('select', date, type);
    },
    handleSelect: function handleSelect(date, type) {
      if (type === 'date') {
        this.openTimePanel();
      }

      var datetime = assignTime(date, getValidDate(this.value, this.defaultValue));

      if (this.disabledTime(new Date(datetime))) {
        // set the time of defalutValue;
        datetime = assignTime(date, this.defaultValue);

        if (this.disabledTime(new Date(datetime))) {
          // if disabled don't emit date
          this.currentValue = datetime;
          return;
        }
      }

      this.emitDate(datetime, type);
    }
  },
  render: function render() {
    var h = arguments[0];
    var calendarProps = {
      props: _objectSpread2({}, pick(this.$props, Object.keys(CalendarPanel.props)), {
        type: 'date',
        value: this.currentValue
      }),
      on: {
        select: this.handleSelect
      }
    };
    var timeProps = {
      props: _objectSpread2({}, pick(this.$props, Object.keys(__vue_component__$b.props)), {
        showTimeHeader: true,
        value: this.currentValue
      }),
      on: {
        select: this.emitDate,
        clicktitle: this.closeTimePanel
      }
    };
    var prefixClass = this.prefixClass;
    return h("div", [h(CalendarPanel, helper([{}, calendarProps])), this.timeVisible && h(__vue_component__$b, helper([{
      "class": "".concat(prefixClass, "-calendar-time")
    }, timeProps]))]);
  }
};

var DatetimeRange = {
  name: 'DatetimeRange',
  inject: {
    prefixClass: {
      default: 'mx'
    }
  },
  emits: ['select', 'update:show-time-panel'],
  props: _objectSpread2({}, CalendarRange.props, {}, TimeRange.props, {
    showTimePanel: {
      type: Boolean,
      default: undefined
    }
  }),
  data: function data() {
    return {
      defaultTimeVisible: false,
      currentValue: this.value
    };
  },
  computed: {
    timeVisible: function timeVisible() {
      return typeof this.showTimePanel === 'boolean' ? this.showTimePanel : this.defaultTimeVisible;
    }
  },
  watch: {
    value: function value(val) {
      this.currentValue = val;
    }
  },
  methods: {
    closeTimePanel: function closeTimePanel() {
      this.defaultTimeVisible = false;
      this.$emit('update:show-time-panel', false);
    },
    openTimePanel: function openTimePanel() {
      this.defaultTimeVisible = true;
      this.$emit('update:show-time-panel', true);
    },
    emitDate: function emitDate(dates, type) {
      this.$emit('select', dates, type);
    },
    handleSelect: function handleSelect(dates, type) {
      var _this = this;

      if (type === 'date') {
        this.openTimePanel();
      }

      var defaultValues = Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue, this.defaultValue];
      var datetimes = dates.map(function (date, i) {
        var time = isValidRangeDate(_this.value) ? _this.value[i] : defaultValues[i];
        return assignTime(date, time);
      });

      if (datetimes[1].getTime() < datetimes[0].getTime()) {
        datetimes = [datetimes[0], datetimes[0]];
      }

      if (datetimes.some(this.disabledTime)) {
        datetimes = dates.map(function (date, i) {
          return assignTime(date, defaultValues[i]);
        });

        if (datetimes.some(this.disabledTime)) {
          this.currentValue = datetimes;
          return;
        }
      }

      this.emitDate(datetimes, type);
    }
  },
  render: function render() {
    var h = arguments[0];
    var calendarProps = {
      props: _objectSpread2({}, pick(this.$props, Object.keys(CalendarRange.props)), {
        type: 'date',
        value: this.currentValue
      }),
      on: {
        select: this.handleSelect
      }
    };
    var timeProps = {
      props: _objectSpread2({}, pick(this.$props, Object.keys(TimeRange.props)), {
        value: this.currentValue,
        showTimeHeader: true
      }),
      on: {
        select: this.emitDate,
        clicktitle: this.closeTimePanel
      }
    };
    var prefixClass = this.prefixClass;
    return h("div", [h(CalendarRange, helper([{}, calendarProps])), this.timeVisible && h(TimeRange, helper([{
      "class": "".concat(prefixClass, "-calendar-time")
    }, timeProps]))]);
  }
};

var componentMap = {
  default: CalendarPanel,
  time: __vue_component__$b,
  datetime: DatetimePanel
};
var componentRangeMap = {
  default: CalendarRange,
  time: TimeRange,
  datetime: DatetimeRange
};
var DatePicker = {
  name: 'DatePicker',
  provide: function provide() {
    var _this = this;

    return {
      // make locale reactive
      getLocale: function getLocale() {
        return _this.locale;
      },
      getWeek: this.getWeek,
      prefixClass: this.prefixClass,
      dispatchDatePicker: this.$emit.bind(this)
    };
  },
  props: _objectSpread2({}, DatetimePanel.props, {
    value: {},
    valueType: {
      type: String,
      default: 'date' // date, format, timestamp, or token like 'YYYY-MM-DD'

    },
    type: {
      type: String,
      // ['date', 'datetime', 'time', 'year', 'month', 'week']
      default: 'date'
    },
    format: {
      type: String
    },
    formatter: {
      type: Object
    },
    range: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    rangeSeparator: {
      type: String
    },
    lang: {
      type: [String, Object]
    },
    placeholder: {
      type: String,
      default: ''
    },
    editable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    prefixClass: {
      type: String,
      default: 'mx'
    },
    inputClass: {},
    inputAttr: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    open: {
      type: Boolean,
      default: undefined
    },
    popupClass: {},
    popupStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    inline: {
      type: Boolean,
      default: false
    },
    confirm: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: 'OK'
    },
    renderInputText: {
      type: Function
    },
    shortcuts: {
      type: Array,
      validator: function validator(value) {
        return Array.isArray(value) && value.every(function (v) {
          return isObject(v) && typeof v.text === 'string' && typeof v.onClick === 'function';
        });
      },
      default: function _default() {
        return [];
      }
    }
  }),
  data: function data() {
    return {
      // cache the innervalue, wait to confirm
      currentValue: null,
      userInput: null,
      defaultOpen: false,
      mouseInInput: false
    };
  },
  computed: {
    popupVisible: function popupVisible() {
      return !this.disabled && (typeof this.open === 'boolean' ? this.open : this.defaultOpen);
    },
    innerRangeSeparator: function innerRangeSeparator() {
      return this.rangeSeparator || (this.multiple ? ',' : ' ~ ');
    },
    innerFormat: function innerFormat() {
      var map = {
        date: 'YYYY-MM-DD',
        datetime: 'YYYY-MM-DD HH:mm:ss',
        year: 'YYYY',
        month: 'YYYY-MM',
        time: 'HH:mm:ss',
        week: 'w'
      };
      return this.format || map[this.type] || map.date;
    },
    innerValue: function innerValue() {
      var value = this.value;

      if (this.validMultipleType) {
        value = Array.isArray(value) ? value : [];
        return value.map(this.value2date);
      }

      if (this.range) {
        value = Array.isArray(value) ? value.slice(0, 2) : [null, null];
        return value.map(this.value2date);
      }

      return this.value2date(value);
    },
    text: function text() {
      var _this2 = this;

      if (this.userInput !== null) {
        return this.userInput;
      }

      if (typeof this.renderInputText === 'function') {
        return this.renderInputText(this.innerValue);
      }

      if (!this.isValidValue(this.innerValue)) {
        return '';
      }

      if (Array.isArray(this.innerValue)) {
        return this.innerValue.map(function (v) {
          return _this2.formatDate(v);
        }).join(this.innerRangeSeparator);
      }

      return this.formatDate(this.innerValue);
    },
    showClearIcon: function showClearIcon() {
      return !this.disabled && this.clearable && this.text && this.mouseInInput;
    },
    locale: function locale() {
      if (isObject(this.lang)) {
        return mergeDeep(getLocale(), this.lang);
      }

      return getLocale(this.lang);
    },
    validMultipleType: function validMultipleType() {
      var types = ['date', 'month', 'year'];
      return this.multiple && !this.range && types.indexOf(this.type) !== -1;
    }
  },
  watch: {
    innerValue: {
      immediate: true,
      handler: function handler(val) {
        this.currentValue = val;
      }
    },
    popupVisible: {
      handler: function handler(val) {
        if (val) {
          this.currentValue = this.innerValue;
        }
      }
    }
  },
  created: function created() {
    if (_typeof(this.format) === 'object') {
      console.warn("[vue2-datepicker]: The prop `format` don't support Object any more. You can use the new prop `formatter` to replace it");
    }
  },
  methods: {
    handleMouseEnter: function handleMouseEnter() {
      this.mouseInInput = true;
    },
    handleMouseLeave: function handleMouseLeave() {
      this.mouseInInput = false;
    },
    handleClickOutSide: function handleClickOutSide(evt) {
      var target = evt.target;

      if (!this.$el.contains(target)) {
        this.closePopup();
      }
    },
    getFormatter: function getFormatter(key) {
      return isObject(this.formatter) && this.formatter[key] || isObject(this.format) && this.format[key];
    },
    getWeek: function getWeek$1(date, options) {
      if (typeof this.getFormatter('getWeek') === 'function') {
        return this.getFormatter('getWeek')(date, options);
      }

      return (0,date_format_parse__WEBPACK_IMPORTED_MODULE_0__.getWeek)(date, options);
    },
    parseDate: function parseDate(value, fmt) {
      fmt = fmt || this.innerFormat;

      if (typeof this.getFormatter('parse') === 'function') {
        return this.getFormatter('parse')(value, fmt);
      }

      var backupDate = new Date();
      return (0,date_format_parse__WEBPACK_IMPORTED_MODULE_0__.parse)(value, fmt, {
        locale: this.locale.formatLocale,
        backupDate: backupDate
      });
    },
    formatDate: function formatDate(date, fmt) {
      fmt = fmt || this.innerFormat;

      if (typeof this.getFormatter('stringify') === 'function') {
        return this.getFormatter('stringify')(date, fmt);
      }

      return (0,date_format_parse__WEBPACK_IMPORTED_MODULE_0__.format)(date, fmt, {
        locale: this.locale.formatLocale
      });
    },
    // transform the outer value to inner date
    value2date: function value2date(value) {
      switch (this.valueType) {
        case 'date':
          return value instanceof Date ? new Date(value.getTime()) : new Date(NaN);

        case 'timestamp':
          return typeof value === 'number' ? new Date(value) : new Date(NaN);

        case 'format':
          return typeof value === 'string' ? this.parseDate(value) : new Date(NaN);

        default:
          return typeof value === 'string' ? this.parseDate(value, this.valueType) : new Date(NaN);
      }
    },
    // transform the inner date to outer value
    date2value: function date2value(date) {
      if (!isValidDate(date)) return null;

      switch (this.valueType) {
        case 'date':
          return date;

        case 'timestamp':
          return date.getTime();

        case 'format':
          return this.formatDate(date);

        default:
          return this.formatDate(date, this.valueType);
      }
    },
    emitValue: function emitValue(date, type) {
      var close = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      // fix IE11/10 trigger input event when input is focused. (placeholder !== '')
      this.userInput = null;
      var value = Array.isArray(date) ? date.map(this.date2value) : this.date2value(date);
      this.$emit('input', value);
      this.$emit('change', value, type);

      if (close) {
        this.closePopup();
      }

      return value;
    },
    isValidValue: function isValidValue(value) {
      if (this.validMultipleType) {
        return isValidDates(value);
      }

      if (this.range) {
        return isValidRangeDate(value);
      }

      return isValidDate(value);
    },
    isValidValueAndNotDisabled: function isValidValueAndNotDisabled(value) {
      if (!this.isValidValue(value)) {
        return false;
      }

      var disabledDate = typeof this.disabledDate === 'function' ? this.disabledDate : function () {
        return false;
      };
      var disabledTime = typeof this.disabledTime === 'function' ? this.disabledTime : function () {
        return false;
      };

      if (!Array.isArray(value)) {
        value = [value];
      }

      return value.every(function (v) {
        return !disabledDate(v) && !disabledTime(v);
      });
    },
    handleMultipleDates: function handleMultipleDates(date, dates) {
      if (this.validMultipleType && dates) {
        var nextDates = dates.filter(function (v) {
          return v.getTime() !== date.getTime();
        });

        if (nextDates.length === dates.length) {
          nextDates.push(date);
        }

        return nextDates;
      }

      return date;
    },
    handleSelectDate: function handleSelectDate(val, type, dates) {
      val = this.handleMultipleDates(val, dates);

      if (this.confirm) {
        this.currentValue = val;
      } else {
        this.emitValue(val, type, // this.type === 'datetime', click the time should close popup
        !this.validMultipleType && (type === this.type || type === 'time'));
      }
    },
    clear: function clear() {
      this.emitValue(this.range ? [null, null] : null);
      this.$emit('clear');
    },
    handleClear: function handleClear(evt) {
      evt.stopPropagation();
      this.clear();
    },
    handleConfirmDate: function handleConfirmDate() {
      var value = this.emitValue(this.currentValue);
      this.$emit('confirm', value);
    },
    handleSelectShortcut: function handleSelectShortcut(evt) {
      var index = evt.currentTarget.getAttribute('data-index');
      var item = this.shortcuts[parseInt(index, 10)];

      if (isObject(item) && typeof item.onClick === 'function') {
        var date = item.onClick(this);

        if (date) {
          this.emitValue(date);
        }
      }
    },
    openPopup: function openPopup(evt) {
      if (this.popupVisible || this.disabled) return;
      this.defaultOpen = true;
      this.$emit('open', evt);
      this.$emit('update:open', true);
    },
    closePopup: function closePopup() {
      if (!this.popupVisible) return;
      this.defaultOpen = false;
      this.$emit('close');
      this.$emit('update:open', false);
    },
    blur: function blur() {
      // when use slot input
      if (this.$refs.input) {
        this.$refs.input.blur();
      }
    },
    focus: function focus() {
      if (this.$refs.input) {
        this.$refs.input.focus();
      }
    },
    handleInputChange: function handleInputChange() {
      var _this3 = this;

      if (!this.editable || this.userInput === null) return;
      var text = this.userInput.trim();
      this.userInput = null;

      if (text === '') {
        this.clear();
        return;
      }

      var date;

      if (this.validMultipleType) {
        date = text.split(this.innerRangeSeparator).map(function (v) {
          return _this3.parseDate(v.trim());
        });
      } else if (this.range) {
        var arr = text.split(this.innerRangeSeparator);

        if (arr.length !== 2) {
          // Maybe the separator during the day is the same as the separator for the date
          // eg: 2019-10-09-2020-01-02
          arr = text.split(this.innerRangeSeparator.trim());
        }

        date = arr.map(function (v) {
          return _this3.parseDate(v.trim());
        });
      } else {
        date = this.parseDate(text);
      }

      if (this.isValidValueAndNotDisabled(date)) {
        this.emitValue(date);
        this.blur();
      } else {
        this.$emit('input-error', text);
      }
    },
    handleInputInput: function handleInputInput(evt) {
      // slot input v-model
      this.userInput = typeof evt === 'string' ? evt : evt.target.value;
    },
    handleInputKeydown: function handleInputKeydown(evt) {
      var keyCode = evt.keyCode; // Tab 9 or Enter 13

      if (keyCode === 9) {
        this.closePopup();
      } else if (keyCode === 13) {
        this.handleInputChange();
      }
    },
    handleInputBlur: function handleInputBlur(evt) {
      // tab close
      this.$emit('blur', evt);
    },
    handleInputFocus: function handleInputFocus(evt) {
      this.openPopup(evt);
      this.$emit('focus', evt);
    },
    hasSlot: function hasSlot(name) {
      return !!(this.$slots[name] || this.$scopedSlots[name]);
    },
    renderSlot: function renderSlot(name, fallback, props) {
      var slotFn = this.$scopedSlots[name];

      if (slotFn) {
        return slotFn(props) || fallback;
      }

      return this.$slots[name] || fallback;
    },
    renderInput: function renderInput() {
      var h = this.$createElement;
      var prefixClass = this.prefixClass;

      var props = _objectSpread2({
        name: 'date',
        type: 'text',
        autocomplete: 'off',
        value: this.text,
        class: this.inputClass || "".concat(this.prefixClass, "-input"),
        readonly: !this.editable,
        disabled: this.disabled,
        placeholder: this.placeholder
      }, this.inputAttr);

      var value = props.value,
          className = props.class,
          attrs = _objectWithoutProperties(props, ["value", "class"]);

      var events = {
        keydown: this.handleInputKeydown,
        focus: this.handleInputFocus,
        blur: this.handleInputBlur,
        input: this.handleInputInput,
        change: this.handleInputChange
      };
      var input = this.renderSlot('input', h("input", {
        "domProps": {
          "value": value
        },
        "class": className,
        "attrs": _objectSpread2({}, attrs),
        "on": _objectSpread2({}, events),
        "ref": "input"
      }), {
        props: props,
        events: events
      });
      var calendarIcon = this.type === 'time' ? h(__vue_component__$2) : h(__vue_component__$1); // remove touchstart event to avoid opens the popup while scrolling in mobile #469

      return h("div", {
        "class": "".concat(prefixClass, "-input-wrapper"),
        "on": {
          "mouseenter": this.handleMouseEnter,
          "mouseleave": this.handleMouseLeave,
          "click": this.openPopup
        },
        "ref": "inputWrapper"
      }, [input, this.showClearIcon ? h("i", {
        "class": "".concat(prefixClass, "-icon-clear"),
        "on": {
          "click": this.handleClear
        }
      }, [this.renderSlot('icon-clear', h(__vue_component__$3))]) : h("i", {
        "class": "".concat(prefixClass, "-icon-calendar")
      }, [this.renderSlot('icon-calendar', calendarIcon)])]);
    },
    renderContent: function renderContent() {
      var h = this.$createElement;
      var map = this.range ? componentRangeMap : componentMap;
      var Component = map[this.type] || map.default;

      var props = _objectSpread2({}, pick(this.$props, Object.keys(Component.props)), {
        value: this.currentValue
      });

      var on = _objectSpread2({}, pick(this.$listeners, Component.emits || []), {
        select: this.handleSelectDate
      });

      var content = h(Component, helper([{}, {
        props: props,
        on: on,
        ref: 'picker'
      }]));
      return h("div", {
        "class": "".concat(this.prefixClass, "-datepicker-body")
      }, [this.renderSlot('content', content, {
        value: this.currentValue,
        emit: this.handleSelectDate
      })]);
    },
    renderSidebar: function renderSidebar() {
      var _this4 = this;

      var h = this.$createElement;
      var prefixClass = this.prefixClass;
      return h("div", {
        "class": "".concat(prefixClass, "-datepicker-sidebar")
      }, [this.renderSlot('sidebar', null, {
        value: this.currentValue,
        emit: this.handleSelectDate
      }), this.shortcuts.map(function (v, i) {
        return h("button", {
          "key": i,
          "attrs": {
            "data-index": i,
            "type": "button"
          },
          "class": "".concat(prefixClass, "-btn ").concat(prefixClass, "-btn-text ").concat(prefixClass, "-btn-shortcut"),
          "on": {
            "click": _this4.handleSelectShortcut
          }
        }, [v.text]);
      })]);
    },
    renderHeader: function renderHeader() {
      var h = this.$createElement;
      return h("div", {
        "class": "".concat(this.prefixClass, "-datepicker-header")
      }, [this.renderSlot('header', null, {
        value: this.currentValue,
        emit: this.handleSelectDate
      })]);
    },
    renderFooter: function renderFooter() {
      var h = this.$createElement;
      var prefixClass = this.prefixClass;
      return h("div", {
        "class": "".concat(prefixClass, "-datepicker-footer")
      }, [this.renderSlot('footer', null, {
        value: this.currentValue,
        emit: this.handleSelectDate
      }), this.confirm ? h("button", {
        "attrs": {
          "type": "button"
        },
        "class": "".concat(prefixClass, "-btn ").concat(prefixClass, "-datepicker-btn-confirm"),
        "on": {
          "click": this.handleConfirmDate
        }
      }, [this.confirmText]) : null]);
    }
  },
  render: function render() {
    var _class;

    var h = arguments[0];
    var prefixClass = this.prefixClass,
        inline = this.inline,
        disabled = this.disabled;
    var sidedar = this.hasSlot('sidebar') || this.shortcuts.length ? this.renderSidebar() : null;
    var content = h("div", {
      "class": "".concat(prefixClass, "-datepicker-content")
    }, [this.hasSlot('header') ? this.renderHeader() : null, this.renderContent(), this.hasSlot('footer') || this.confirm ? this.renderFooter() : null]);
    return h("div", {
      "class": (_class = {}, _defineProperty(_class, "".concat(prefixClass, "-datepicker"), true), _defineProperty(_class, "".concat(prefixClass, "-datepicker-range"), this.range), _defineProperty(_class, "".concat(prefixClass, "-datepicker-inline"), inline), _defineProperty(_class, "disabled", disabled), _class)
    }, [!inline ? this.renderInput() : null, !inline ? h(__vue_component__, {
      "ref": "popup",
      "class": this.popupClass,
      "style": this.popupStyle,
      "attrs": {
        "visible": this.popupVisible,
        "appendToBody": this.appendToBody
      },
      "on": {
        "clickoutside": this.handleClickOutSide
      }
    }, [sidedar, content]) : h("div", {
      "class": "".concat(prefixClass, "-datepicker-main")
    }, [sidedar, content])]);
  }
};

DatePicker.locale = locale;

DatePicker.install = function install(Vue) {
  Vue.component(DatePicker.name, DatePicker);
};

if (typeof window !== 'undefined' && window.Vue) {
  DatePicker.install(window.Vue);
}

_extends(DatePicker, {
  CalendarPanel: CalendarPanel,
  CalendarRange: CalendarRange,
  TimePanel: __vue_component__$b,
  TimeRange: TimeRange,
  DatetimePanel: DatetimePanel,
  DatetimeRange: DatetimeRange
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DatePicker);


/***/ })

}]);