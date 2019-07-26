define(function(require, exports, module) {
  /*********************
   * Allow for activation/deactivation of various page types 
   * and associated documents from Dashboard
   * ******************/

  var $ = require("jquery");
  var dashletSelector = ".htmldashlet .body .cricket-activation-deactivation"

  var activeClass = "active"
  var activeSelector = "." + activeClass
  var textInput = '<input type="text" />'

  var tabsClass = "activation-tabs"
  var tabsTabClass = "tab"
  var tabsSelector = dashletSelector + " ." + tabsClass
  var tabsTabSelector = tabsSelector + " ." + tabsTabClass
  var tabs = '<div class="' + tabsClass + '">' +
    '<div class="' + tabsTabClass + ' ' + activeClass + ' phone">Phone</div>' +
    '<div class="' + tabsTabClass + ' product">Product</div>' +
    '<div class="' + tabsTabClass + ' accessory">Accessory</div>' +
    '<div class="tab page">Page</div>' +
    '</div>'

  var tabContentClass = "tab-content"
  var tabContentSelector = dashletSelector + " ." + tabContentClass
  var tabContentContentClass = "content"
  var tabContentContentSelector = tabContentSelector + " ." + tabContentContentClass
  var tabContentContentActiveSelector = tabContentContentSelector + activeSelector
  var tabContentContentPhoneClass = "phone"
  var tabContentContentPhoneSelector = tabContentContentSelector + "." + tabContentContentPhoneClass
  var tabContentContentProductClass = "product"
  var tabContentContentProductSelector = tabContentContentSelector + "." + tabContentContentProductClass
  var tabContentContentAccessoryClass = "accessory"
  var tabContentContentAccessorySelector = tabContentContentSelector + "." + tabContentContentAccessoryClass
  var tabContentContentPageClass = "page"
  var tabContentContentPageSelector = tabContentContentSelector + " ." + tabContentContentPageClass
  var tabContent = '<div class="' + tabContentClass + '">' +
    '<div class="' + tabContentContentClass + ' ' + tabContentContentPhoneClass + ' ' + activeClass + '"></div>' +
    '<div class="' + tabContentContentClass + ' ' + tabContentContentProductClass + '"></div>' +
    '<div class="' + tabContentContentClass + ' ' +tabContentContentAccessoryClass + '"></div>' +
    '<div class="' + tabContentContentClass + ' ' + tabContentContentPageClass + '"></div></div>'

  var typeClass = "activation-page-type"
  var typeSelector = dashletSelector + " ." + typeClass
  var typeSelectSelector = typeSelector + " select"
  var typeSelect = '<div class="' + typeClass + '"><label>Page Type<select><option value="page">Page</option><option value="page-shop">Shop Page</option><option value="page-support-article">Support Article Page</option><option value="page-support-category">Support Category Page</option><option value="page-support-home">Support Home Page</option></select></label></div>'

  var pageListClass = "activation-page-list"
  var pageListSelector = dashletSelector + " ." + pageListClass
  var pageListSelectSelector = pageListSelector + " select"

  var urlTextClass = "activation-url"
  var accessoryClass = "accessory"
  var detailsClass = "details"
  var parentClass = "parent"
  var pageClass = "page"
  var urlTextPageSelector = dashletSelector + " ." + urlTextClass + "." + pageClass
  var urlTextPageInputSelector = dashletSelector + " ." + urlTextClass + "." + pageClass + " input"
  var urlTextAccessoryInputSelector = dashletSelector + " ." + urlTextClass + "." + accessoryClass + " input"
  var urlTextPhoneDetailsInputSelector = dashletSelector + "." + urlTextClass + "." + detailsClass + " input"
  var urlTextProductParentInputSelector = dashletSelector + " ." + urlTextClass + "." + parentClass + " input"
  var urlTextInput = '<div class="' + urlTextClass + '"><label>URL' + textInput + '</label></div>'

  var skuTextClass = "activation-sku"
  var skuAccessorySelector = tabContentContentAccessorySelector + " ." + skuTextClass + " input"
  var skuPhoneSelector = tabContentContentPhoneSelector + " ." + skuTextClass + " input"
  var skuText = '<div class="' + skuTextClass + '"><label>Phone or Accessory SKU' + textInput + '</label></div>'

  var activateClass = "activation-activate"
  var activateSelector = dashletSelector + " ." + activateClass
  var activateButtonSelector = activateSelector + " input"
  var activateButton = '<div class="' + activateClass + '"><input type="button" value="Activate" /></div>'

  var deactivateClass = "activation-deactivate"
  var deactivateSelector = dashletSelector + " ." + deactivateClass
  var deactivateButtonSelector = deactivateSelector + " input"
  var deactivateButton = '<div class="' + deactivateClass + '"><input type="button" value="Deactivate" /></div>'

  var messageClass = "activation-message"
  var messageSelector = dashletSelector + " ." + messageClass
  var message = '<div class=' + messageClass + '></div>'
  var errorMessageClass = "errorMessage"
  var errorMessageSelector = messageSelector + "." + errorMessageClass
  var successMessageClass = "successMessage"
  var successMessageSelector = messageSelector + "." + successMessageClass

  var buttonsClass = "activation-buttons"
  var buttonsSelector = dashletSelector + " ." + buttonsClass
  var buttons = '<div class="' + buttonsClass + '">' + activateButton + deactivateButton + '</div>'

  var activationStyles = tabsSelector + " .tab { display: inline-block; padding: 10px; cursor: pointer; background: #e9e9e9; border: 1px solid #ccc; border-bottom: none; }" +
    tabsSelector + " { position: relative; top: 1px; }" +
    tabsSelector + " .tab" + activeSelector + " { background: #fff; border-bottom: 1px solid #fff; }" +
    tabContentSelector + " { background: #fff; border: 1px solid #ccc; border-bottom: none; padding: 10px; }" +
    tabContentSelector + " .content { display: none; }" +
    tabContentSelector + " .content" + activeSelector + " { display: block; }" +
    buttonsSelector + " { background: #fff; border: 1px solid #ccc; border-top: none; padding: 0 10px 10px; text-align: right; }" +
    activateSelector + ", " + deactivateSelector + " { display: inline-block; margin: 10px 0 0 10px; }" +
    dashletSelector + " label { width: 100%; display: flex; flex-direction: column; }" +
    messageSelector + " { border: 1px solid #ccc; border-width: 0 1px; padding: 0 10px; }" +
    errorMessageSelector + " { color: #a94442; }" +
    successMessageSelector + " { color: rgb(39, 174, 96); }"


  function genericErrorLoggerHalter(err) {
    console.error(err);
    return false;
  }

  function genericMessagingErrorLoggerHalter(err) {
    setMessage("There was a problem. Please contact the CMS team about the document(s) you are trying to modify", errorMessageClass)
    enableButtons()
    console.error(err)
    return false
  }

  function getChain() {
    var branch = Ratchet.observable('branch').get()
    var chain = Chain(branch)
    return chain;
  }

  function disableButtons() {
    $(activateButtonSelector + ", " + deactivateButtonSelector).attr("disabled", "disabled")
  }

  function enableButtons() {
    $(activateButtonSelector + ", " + deactivateButtonSelector).removeAttr("disabled")
  }

  function setMessage(msg, msgClass) {
    clearMessage()
    $(messageSelector).addClass(msgClass).text(msg)
  }

  function clearMessage() {
    $(messageSelector).removeClass([errorMessageClass, successMessageClass].join(" ")).empty()
  }

  function getPages() {
    var chain = getChain()
    var pageType = $(typeSelectSelector).val()
    var query = {
      "_type": "cricket:" + pageType,
    }

    disableButtons()
    if (chain.queryNodes) {
      chain.trap(genericErrorLoggerHalter).queryNodes(query).then(function () {
        var pages = this.asArray()
        populateSelect(pages)
        enableButtons()
      })
    }
  }

  function populateSelect(pages) {
    var pageListSelect = '<div class="' + pageListClass + '"><label>Page Title<select name="">'
    var pageList = $(pageListSelector)

    //populate options inside select
    pages.forEach(function (page, index) {
      pageListSelect += '<option value="' + page._doc + '">' + page.title + '</option>'
    })
    pageListSelect += '</select></label></div>'

    //remove the old list
    pageList.remove()
    //insert into DOM
    $(typeSelector).after(pageListSelect)
    //enable buttons
    enableButtons()
  }

  function populateDashlet() {
    //inject styles
    $(dashletSelector).append("<style>" + activationStyles + "</style>")

    //inject controls

    //tabs to change modes
    $(dashletSelector).append(tabs)

    //tab content areas
    $(dashletSelector).append(tabContent)

    //in phone tab...
    var tab = $(dashletSelector).find(".content.phone")
    var sku = $(skuText)
    sku.find("label").html("Phone SKU" + textInput)
    tab.append(sku)
    var details = $(urlTextInput).addClass(detailsClass)
    details.find("label").html("Details URL" + textInput)
    tab.append(details)

    //in product tab...
    tab = $(dashletSelector).find(".content.product")
    var parent = $(urlTextInput).addClass(parentClass)
    parent.find("label").html('Parent URL' + textInput)
    tab.append(parent)

    //in accessory tab...
    tab = $(dashletSelector).find(".content.accessory")
    sku = $(skuText)
    sku.find("label").html("Accessory SKU" + textInput)
    tab.append(sku)
    details = $(urlTextInput).addClass(accessoryClass)
    details.find("label").html("Details URL" + textInput)
    tab.append(details)

    //in page tab...
    tab = $(dashletSelector).find(".content.page")
    tab.append(typeSelect)
    var pageUrl = $(urlTextInput).addClass(pageClass)
    tab.append(pageUrl)

    //after tab contents...
    $(dashletSelector).append(message)
    $(dashletSelector).append(buttons)
    //populate initial page title select
    getPages()
  }

  $(document).on('cloudcms-ready', function(event) {
    var branch
    if (Ratchet) {
      branch = Ratchet.observable('branch').get()
    }
    //only inject form if user is on branch
    if (branch && !branch.isMaster()) {
      populateDashlet()
    }
  })

  function handleTabChange() {
    var activeTab = $(this)
    if (activeTab.hasClass(tabContentContentPageClass)) {
      hideShowUrlFieldForPageType()
    }
    var tabs = $(tabsTabSelector)
    var activeIndex = tabs.index(activeTab)
    var contents = $(tabContentContentSelector)

    tabs.removeClass(activeClass)
    activeTab.addClass(activeClass)
    contents.removeClass(activeClass)
    contents.eq(activeIndex).addClass(activeClass)

    clearMessage()
  }

  function handlePageTypeChange() {
    hideShowUrlFieldForPageType()
  }

  function isShopPage() {
    var pageType = $(typeSelectSelector).val()
    return "page-shop" === pageType
  }

  function hideShowUrlFieldForPageType() {
    var pageList = $(pageListSelector)
    var pageUrl = $(urlTextPageSelector)

    if (isShopPage()) {
    //for shop, provide url field
      pageList.hide()
      pageUrl.show()
    } else {
    //for all others, populate select options with page titles
      pageUrl.hide()
      getPages()
    }
  }

  function activateDeactivatePage(options) {
    /***
     * update page only
     */
    var pageType = $(typeSelectSelector).val()
    var query = {"_type": "cricket:" + pageType}

    if (isShopPage()) {
      var url = $(urlTextPageInputSelector).val()
      query.urlList = {
        "$elemMatch": {
          "url": url,
          "shopIsPromo": "yes"
        }
      }
    } else {
      var docId = $(pageListSelectSelector).val()
      query._doc = docId
    }

    options.chain.trap(function (err) {
      //page not found
      console.error(err)
      setMessage("Page not found", errorMessageClass)
      enableButtons()
    }).queryOne(query).then(function() {
      var page = Chain(this)
      page.active = options.activeVal
      page.trap(genericMessagingErrorLoggerHalter).update().then(function () {
        setMessage(this.title + " has been " + options.updateVerb + " successfully", successMessageClass)
        enableButtons()
      })
    })
  }

  function activateDeactivateAccessory(options) {
    /*
     * update sku, page and product
     */
    var url = $(urlTextAccessoryInputSelector).val()
    var sku = $(skuAccessorySelector).val()
    var skuDoc

    var skuQuery = {
      "_type": "cricket:sku",
      "skuId": sku
    } 

    options.chain.trap(function (err) {
      //sku not found
      console.error(err)
      setMessage("SKU not found", errorMessageClass)
      enableButtons()
    }).queryOne(skuQuery).then(function() {
      skuDoc = this
      var pageAndProductQuery = {
        "$or":[{
          "_type":  {
            "$regex": "cricket:page(-.+)?"
          },
          "urlList": {
            "$elemMatch": {
              "url": url
            }
          },
          "skus": {
            "$elemMatch": {
              "id": this._doc
            }
          }
        }, {
          "_type": "cricket:product",
          "productType": "accessory",
          "skus": {
            "$elemMatch": {
              "id": this._doc
            }
          }
        }]
      }
      getChain().trap(function(err) {
        //neither page nor product found
        console.error(err)
        setMessage("Page and/or Product not found", errorMessageClass)
        enableButtons()
      }).queryNodes(pageAndProductQuery).then(function() {
        var docs = this.asArray()
        if (2 !== docs.length) {
          setMessage("The SKU and URL do not appear to be related. Please check the fields again.", errorMessageClass)
          enableButtons()
          return false
        }
      }).each(function () {
        this.active = options.activeVal
        this.trap(genericMessagingErrorLoggerHalter).update()
      }).then(function () {
        //product + page written, update sku
        skuDoc.active = options.activeVal
        skuDoc.trap(genericMessagingErrorLoggerHalter).update().then(function() {
          setMessage(sku + " and " + url + " have been " + options.updateVerb + " successfully", successMessageClass)
          enableButtons()
        })
      })
    })   
  }

  function activateDeactivatePhone(options) {
    /*
     * update sku, page
     */
    var detailsUrl = $(urlTextPhoneDetailsInputSelector).val()
    var sku = $(skuAccessorySelector).val()
    var skuDoc

    var skuQuery = {
      "_type": "cricket:sku",
      "skuId": sku
    } 

    options.chain.trap(function (err) {
      //docs not found
      console.error(err)
      setMessage("SKU not found", errorMessageClass)
      enableButtons()
    }).queryOne(skuQuery).then(function() {
      skuDoc = this
      var pageQuery = {
        "_type":  {
          "$regex": "cricket:page(-.+)?"
        },
        "urlList": {
          "$elemMatch": {
            "url": detailsUrl
          }
        },
        "skus": {
          "$elemMatch": {
            "id": this._doc
          }
        }
      }
      getChain().trap(function(err) {
        //page not found
        console.error(err)
        setMessage("Page not found", errorMessageClass)
        enableButtons()
      }).queryOne(pageQuery).then(function() {
        this.active = options.activeVal
        this.trap(genericMessagingErrorLoggerHalter).update()
      }).then(function () {
        //page written, update sku
        skuDoc.active = options.activeVal
        skuDoc.trap(genericMessagingErrorLoggerHalter).update().then(function() {
          //success messaging
          setMessage(sku + " and " + url + " have been " + options.updateVerb + " successfully", successMessageClass)
          enableButtons()
        })
      })
    })   
  }

  function activateDeactivateProduct(options) {
    /*
     * update page, product
     * when options.activeVal is "n", also deactivate all skus and their details pages
     */
    var parentUrl = $(urlTextProductParentInputSelector).val()
    var product
    var pageQuery = {
      "_type":  {
        "$regex": "cricket:page(-.+)?"
      },
      "urlList": {
        "$elemMatch": {
          "url": parentUrl
        }
      }
    }

    options.chain.trap(function (err) {
      //docs not found
      console.error(err)
      setMessage("Page not found", errorMessageClass)
      enableButtons()
    }).queryOne(skuQuery).then(function() {
      product = this
      var productAndSkusQuery = {
        "_type":  {
          "$regex": "cricket:product",
          "productType": "accessory"
        },
        "urlList": {
          "$elemMatch": {
            "url": parentUrl
          }
        }
      }
      options.chain.trap(function(err) {
        //page not found
        console.error(err)
        setMessage("Page not found", errorMessageClass)
        enableButtons()
      }).queryNodes(pageAndProductQuery).then(function() {
        var docs = this.asArray()
        if (2 !== docs.length) {
          setMessage("The SKU and URL do not appear to be related. Please check the fields again.", errorMessageClass)
          enableButtons()
          return false
        }
      }).each(function () {
        this.active = options.activeVal
        this.trap(genericMessagingErrorLoggerHalter).update()
      }).then(function () {
        //product + page written, update sku
        skuDoc.active = options.activeVal
        skuDoc.trap(genericMessagingErrorLoggerHalter).update().then(function() {
          //success messaging
          setMessage(sku + " and " + url + " have been " + options.updateVerb + " successfully", successMessageClass)
          enableButtons()
        })
      })
    })   
  }

  function handleActivateDeactivate() {
    var options = {
      chain: getChain(),
      activeVal: "Activate" === $(this).val() ? "y": "n",
      updateVerb: "Activate" === $(this).val() ? "activated" : "deactivated"
    }
    var activeTabContentContent = $(tabContentContentActiveSelector) 

    clearMessage()
    disableButtons()

    //for page tab
    if (activeTabContentContent.hasClass(tabContentContentPageClass)) {
      activateDeactivatePage(options)
    }
    //for accessory tab
    if (activeTabContentContent.hasClass(tabContentContentAccessoryClass)) {
      activateDeactivateAccessory(options)   
    }
    //for phone tab
    if (activeTabContentContent.hasClass(tabContentContentPhoneClass)) {
      activateDeactivatePhone(options)
    }
    if (activeTabContentContent.hasClass(tabContentContentProductClass)) {
      activateDeactivateProduct(options)
    }
  }

  $(document).on('click', tabsTabSelector, handleTabChange)
  $(document).on('change', typeSelectSelector, handlePageTypeChange)
  $(document).on('click', activateButtonSelector + ', ' + deactivateButtonSelector, handleActivateDeactivate)
});
