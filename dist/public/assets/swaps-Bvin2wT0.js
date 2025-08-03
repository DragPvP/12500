import{i as D,a0 as s,V as w,c as C,a as U,v as P,N as _,x as u,Y as m,r as V,M as W,R as S,J as j,y as K,aL as M,O as F,W as Q,Q as H,T as q,bc as R}from"./index-CFWdg3Ve.js";import{S as n}from"./index-2Y2p1y9f.js";const G={numericInputKeyDown(c,e,t){const i=["Backspace","Meta","Ctrl","a","A","c","C","x","X","v","V","ArrowLeft","ArrowRight","Tab"],a=c.metaKey||c.ctrlKey,o=c.key,r=o.toLocaleLowerCase(),l=r==="a",x=r==="c",v=r==="v",L=r==="x",E=o===",",N=o===".",B=o>="0"&&o<="9";!a&&(l||x||v||L)&&c.preventDefault(),e==="0"&&!E&&!N&&o==="0"&&c.preventDefault(),e==="0"&&B&&(t(o),c.preventDefault()),(E||N)&&(e||(t("0."),c.preventDefault()),(e!=null&&e.includes(".")||e!=null&&e.includes(","))&&c.preventDefault()),!B&&!i.includes(o)&&!N&&!E&&c.preventDefault()}},Y=D`
  :host {
    width: 100%;
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    cursor: pointer;
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    padding-top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s);
    padding-left: var(--wui-spacing-s);
    padding-right: var(--wui-spacing-1xs);
    border-radius: calc(var(--wui-border-radius-5xs) + var(--wui-border-radius-4xs));
    background: var(--wui-color-gray-glass-002);
  }

  .details-row-title {
    white-space: nowrap;
  }

  .details-row.provider-free-row {
    padding-right: var(--wui-spacing-xs);
  }
`;var k=function(c,e,t,i){var a=arguments.length,o=a<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(c,e,t,i);else for(var l=c.length-1;l>=0;l--)(r=c[l])&&(o=(a<3?r(o):a>3?r(e,t,o):r(e,t))||o);return a>3&&o&&Object.defineProperty(e,t,o),o};const J=V.CONVERT_SLIPPAGE_TOLERANCE;let f=class extends U{constructor(){var e;super(),this.unsubscribe=[],this.networkName=(e=P.state.activeCaipNetwork)==null?void 0:e.name,this.detailsOpen=!1,this.sourceToken=n.state.sourceToken,this.toToken=n.state.toToken,this.toTokenAmount=n.state.toTokenAmount,this.sourceTokenPriceInUSD=n.state.sourceTokenPriceInUSD,this.toTokenPriceInUSD=n.state.toTokenPriceInUSD,this.priceImpact=n.state.priceImpact,this.maxSlippage=n.state.maxSlippage,this.networkTokenSymbol=n.state.networkTokenSymbol,this.inputError=n.state.inputError,this.unsubscribe.push(n.subscribe(t=>{this.sourceToken=t.sourceToken,this.toToken=t.toToken,this.toTokenAmount=t.toTokenAmount,this.priceImpact=t.priceImpact,this.maxSlippage=t.maxSlippage,this.sourceTokenPriceInUSD=t.sourceTokenPriceInUSD,this.toTokenPriceInUSD=t.toTokenPriceInUSD,this.inputError=t.inputError}))}render(){const e=this.toTokenAmount&&this.maxSlippage?_.bigNumber(this.toTokenAmount).minus(this.maxSlippage).toString():null;if(!this.sourceToken||!this.toToken||this.inputError)return null;const t=this.sourceTokenPriceInUSD&&this.toTokenPriceInUSD?1/this.toTokenPriceInUSD*this.sourceTokenPriceInUSD:0;return u`
      <wui-flex flexDirection="column" alignItems="center" gap="1xs" class="details-container">
        <wui-flex flexDirection="column">
          <button @click=${this.toggleDetails.bind(this)}>
            <wui-flex justifyContent="space-between" .padding=${["0","xs","0","xs"]}>
              <wui-flex justifyContent="flex-start" flexGrow="1" gap="xs">
                <wui-text variant="small-400" color="fg-100">
                  1 ${this.sourceToken.symbol} =
                  ${m.formatNumberToLocalString(t,3)}
                  ${this.toToken.symbol}
                </wui-text>
                <wui-text variant="small-400" color="fg-200">
                  $${m.formatNumberToLocalString(this.sourceTokenPriceInUSD)}
                </wui-text>
              </wui-flex>
              <wui-icon name="chevronBottom"></wui-icon>
            </wui-flex>
          </button>
          ${this.detailsOpen?u`
                <wui-flex flexDirection="column" gap="xs" class="details-content-container">
                  ${this.priceImpact?u` <wui-flex flexDirection="column" gap="xs">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="xs">
                            <wui-text class="details-row-title" variant="small-400" color="fg-150">
                              Price impact
                            </wui-text>
                            <w3m-tooltip-trigger
                              text="Price impact reflects the change in market price due to your trade"
                            >
                              <wui-icon size="xs" color="fg-250" name="infoCircle"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="small-400" color="fg-200">
                              ${m.formatNumberToLocalString(this.priceImpact,3)}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>`:null}
                  ${this.maxSlippage&&this.sourceToken.symbol?u`<wui-flex flexDirection="column" gap="xs">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="xs">
                            <wui-text class="details-row-title" variant="small-400" color="fg-150">
                              Max. slippage
                            </wui-text>
                            <w3m-tooltip-trigger
                              text=${`Max slippage sets the minimum amount you must receive for the transaction to proceed. ${e?`Transaction will be reversed if you receive less than ${m.formatNumberToLocalString(e,6)} ${this.toToken.symbol} due to price changes.`:""}`}
                            >
                              <wui-icon size="xs" color="fg-250" name="infoCircle"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="small-400" color="fg-200">
                              ${m.formatNumberToLocalString(this.maxSlippage,6)}
                              ${this.toToken.symbol} ${J}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>`:null}
                  <wui-flex flexDirection="column" gap="xs">
                    <wui-flex
                      justifyContent="space-between"
                      alignItems="center"
                      class="details-row provider-free-row"
                    >
                      <wui-flex alignItems="center" gap="xs">
                        <wui-text class="details-row-title" variant="small-400" color="fg-150">
                          Provider fee
                        </wui-text>
                      </wui-flex>
                      <wui-flex>
                        <wui-text variant="small-400" color="fg-200">0.85%</wui-text>
                      </wui-flex>
                    </wui-flex>
                  </wui-flex>
                </wui-flex>
              `:null}
        </wui-flex>
      </wui-flex>
    `}toggleDetails(){this.detailsOpen=!this.detailsOpen}};f.styles=[Y];k([s()],f.prototype,"networkName",void 0);k([w()],f.prototype,"detailsOpen",void 0);k([s()],f.prototype,"sourceToken",void 0);k([s()],f.prototype,"toToken",void 0);k([s()],f.prototype,"toTokenAmount",void 0);k([s()],f.prototype,"sourceTokenPriceInUSD",void 0);k([s()],f.prototype,"toTokenPriceInUSD",void 0);k([s()],f.prototype,"priceImpact",void 0);k([s()],f.prototype,"maxSlippage",void 0);k([s()],f.prototype,"networkTokenSymbol",void 0);k([s()],f.prototype,"inputError",void 0);f=k([C("w3m-swap-details")],f);const X=D`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--wui-border-radius-s);
    padding: var(--wui-spacing-xl);
    padding-right: var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-002);
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    position: relative;
  }

  wui-shimmer.market-value {
    opacity: 0;
  }

  :host > wui-flex > svg.input_mask {
    position: absolute;
    inset: 0;
    z-index: 5;
  }

  :host wui-flex .input_mask__border,
  :host wui-flex .input_mask__background {
    transition: fill var(--wui-duration-md) var(--wui-ease-out-power-1);
    will-change: fill;
  }

  :host wui-flex .input_mask__border {
    fill: var(--wui-color-gray-glass-020);
  }

  :host wui-flex .input_mask__background {
    fill: var(--wui-color-gray-glass-002);
  }
`;var z=function(c,e,t,i){var a=arguments.length,o=a<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(c,e,t,i);else for(var l=c.length-1;l>=0;l--)(r=c[l])&&(o=(a<3?r(o):a>3?r(e,t,o):r(e,t))||o);return a>3&&o&&Object.defineProperty(e,t,o),o};let O=class extends U{constructor(){super(...arguments),this.target="sourceToken"}render(){return u`
      <wui-flex class justifyContent="space-between">
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
          gap="xxs"
        >
          <wui-shimmer width="80px" height="40px" borderRadius="xxs" variant="light"></wui-shimmer>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `}templateTokenSelectButton(){return u`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="xxs"
      >
        <wui-shimmer width="80px" height="40px" borderRadius="3xl" variant="light"></wui-shimmer>
      </wui-flex>
    `}};O.styles=[X];z([w()],O.prototype,"target",void 0);O=z([C("w3m-swap-input-skeleton")],O);const Z=D`
  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-xl);
    padding-right: var(--wui-spacing-s);
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-002);
    position: relative;
    transition: box-shadow var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  :host wui-flex.focus {
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-005);
  }

  :host > wui-flex .swap-input,
  :host > wui-flex .swap-token-button {
    z-index: 10;
  }

  :host > wui-flex .swap-input {
    -webkit-mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
    mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
  }

  :host > wui-flex .swap-input input {
    background: none;
    border: none;
    height: 42px;
    width: 100%;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: -1.28px;
    outline: none;
    caret-color: var(--wui-color-accent-100);
    color: var(--wui-color-fg-100);
    padding: 0px;
  }

  :host > wui-flex .swap-input input:focus-visible {
    outline: none;
  }

  :host > wui-flex .swap-input input::-webkit-outer-spin-button,
  :host > wui-flex .swap-input input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .max-value-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: var(--wui-color-gray-glass-020);
    padding-left: 0px;
  }

  .market-value {
    min-height: 18px;
  }
`;var y=function(c,e,t,i){var a=arguments.length,o=a<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(c,e,t,i);else for(var l=c.length-1;l>=0;l--)(r=c[l])&&(o=(a<3?r(o):a>3?r(e,t,o):r(e,t))||o);return a>3&&o&&Object.defineProperty(e,t,o),o};const ee=5e-5;let b=class extends U{constructor(){super(...arguments),this.focused=!1,this.price=0,this.target="sourceToken",this.onSetAmount=null,this.onSetMaxValue=null}render(){const e=this.marketValue||"0",t=_.bigNumber(e).gt("0");return u`
      <wui-flex class="${this.focused?"focus":""}" justifyContent="space-between">
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
        >
          <input
            data-testid="swap-input-${this.target}"
            @focusin=${()=>this.onFocusChange(!0)}
            @focusout=${()=>this.onFocusChange(!1)}
            ?disabled=${this.disabled}
            .value=${this.value}
            @input=${this.dispatchInputChangeEvent}
            @keydown=${this.handleKeydown}
            placeholder="0"
            type="text"
            inputmode="decimal"
          />
          <wui-text class="market-value" variant="small-400" color="fg-200">
            ${t?`$${m.formatNumberToLocalString(this.marketValue,2)}`:null}
          </wui-text>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `}handleKeydown(e){return G.numericInputKeyDown(e,this.value,t=>{var i;return(i=this.onSetAmount)==null?void 0:i.call(this,this.target,t)})}dispatchInputChangeEvent(e){if(!this.onSetAmount)return;const t=e.target.value.replace(/[^0-9.]/gu,"");t===","||t==="."?this.onSetAmount(this.target,"0."):t.endsWith(",")?this.onSetAmount(this.target,t.replace(",",".")):this.onSetAmount(this.target,t)}setMaxValueToInput(){var e;(e=this.onSetMaxValue)==null||e.call(this,this.target,this.balance)}templateTokenSelectButton(){return this.token?u`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="xxs"
      >
        <wui-token-button
          data-testid="swap-input-token-${this.target}"
          text=${this.token.symbol}
          imageSrc=${this.token.logoUri}
          @click=${this.onSelectToken.bind(this)}
        >
        </wui-token-button>
        <wui-flex alignItems="center" gap="xxs"> ${this.tokenBalanceTemplate()} </wui-flex>
      </wui-flex>
    `:u` <wui-button
        data-testid="swap-select-token-button-${this.target}"
        class="swap-token-button"
        size="md"
        variant="accent"
        @click=${this.onSelectToken.bind(this)}
      >
        Select token
      </wui-button>`}tokenBalanceTemplate(){const e=_.multiply(this.balance,this.price),t=e?e==null?void 0:e.gt(ee):!1;return u`
      ${t?u`<wui-text variant="small-400" color="fg-200">
            ${m.formatNumberToLocalString(this.balance,2)}
          </wui-text>`:null}
      ${this.target==="sourceToken"?this.tokenActionButtonTemplate(t):null}
    `}tokenActionButtonTemplate(e){return e?u` <button class="max-value-button" @click=${this.setMaxValueToInput.bind(this)}>
        <wui-text color="accent-100" variant="small-600">Max</wui-text>
      </button>`:u` <button class="max-value-button" @click=${this.onBuyToken.bind(this)}>
      <wui-text color="accent-100" variant="small-600">Buy</wui-text>
    </button>`}onFocusChange(e){this.focused=e}onSelectToken(){W.sendEvent({type:"track",event:"CLICK_SELECT_TOKEN_TO_SWAP"}),S.push("SwapSelectToken",{target:this.target})}onBuyToken(){S.push("OnRampProviders")}};b.styles=[Z];y([w()],b.prototype,"focused",void 0);y([w()],b.prototype,"balance",void 0);y([w()],b.prototype,"value",void 0);y([w()],b.prototype,"price",void 0);y([w()],b.prototype,"marketValue",void 0);y([w()],b.prototype,"disabled",void 0);y([w()],b.prototype,"target",void 0);y([w()],b.prototype,"token",void 0);y([w()],b.prototype,"onSetAmount",void 0);y([w()],b.prototype,"onSetMaxValue",void 0);b=y([C("w3m-swap-input")],b);const te=D`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .action-button {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
  }

  .action-button:disabled {
    border-color: 1px solid var(--wui-color-gray-glass-005);
  }

  .swap-inputs-container {
    position: relative;
  }

  .replace-tokens-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: var(--wui-spacing-1xs);
    border-radius: var(--wui-border-radius-xs);
    background-color: var(--wui-color-modal-bg-base);
    padding: var(--wui-spacing-xxs);
  }

  .replace-tokens-button-container > button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    padding: var(--wui-spacing-xs);
    border: none;
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-duration-md) var(--wui-ease-out-power-1);
    will-change: background-color;
    z-index: 20;
  }

  .replace-tokens-button-container > button:hover {
    background: var(--wui-color-gray-glass-005);
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    transition: background 0.2s linear;
  }

  .details-container > wui-flex > button:hover {
    background: var(--wui-color-gray-glass-002);
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }
`;var h=function(c,e,t,i){var a=arguments.length,o=a<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(c,e,t,i);else for(var l=c.length-1;l>=0;l--)(r=c[l])&&(o=(a<3?r(o):a>3?r(e,t,o):r(e,t))||o);return a>3&&o&&Object.defineProperty(e,t,o),o};let p=class extends U{constructor(){var e,t;super(),this.unsubscribe=[],this.initialParams=(e=S.state.data)==null?void 0:e.swap,this.detailsOpen=!1,this.caipAddress=j.state.caipAddress,this.caipNetworkId=(t=P.state.activeCaipNetwork)==null?void 0:t.caipNetworkId,this.initialized=n.state.initialized,this.loadingQuote=n.state.loadingQuote,this.loadingPrices=n.state.loadingPrices,this.loadingTransaction=n.state.loadingTransaction,this.sourceToken=n.state.sourceToken,this.sourceTokenAmount=n.state.sourceTokenAmount,this.sourceTokenPriceInUSD=n.state.sourceTokenPriceInUSD,this.toToken=n.state.toToken,this.toTokenAmount=n.state.toTokenAmount,this.toTokenPriceInUSD=n.state.toTokenPriceInUSD,this.inputError=n.state.inputError,this.fetchError=n.state.fetchError,this.lastTokenPriceUpdate=0,this.minTokenPriceUpdateInterval=1e4,this.visibilityChangeHandler=()=>{document!=null&&document.hidden?(clearInterval(this.interval),this.interval=void 0):this.startTokenPriceInterval()},this.startTokenPriceInterval=()=>{this.interval&&Date.now()-this.lastTokenPriceUpdate<this.minTokenPriceUpdateInterval||(this.lastTokenPriceUpdate&&Date.now()-this.lastTokenPriceUpdate>this.minTokenPriceUpdateInterval&&this.fetchTokensAndValues(),clearInterval(this.interval),this.interval=setInterval(()=>{this.fetchTokensAndValues()},this.minTokenPriceUpdateInterval))},this.watchTokensAndValues=()=>{!this.sourceToken||!this.toToken||(this.subscribeToVisibilityChange(),this.startTokenPriceInterval())},this.onDebouncedGetSwapCalldata=K.debounce(async()=>{await n.swapTokens()},200),P.subscribeKey("activeCaipNetwork",i=>this.onCaipNetworkChange({newCaipNetwork:i,resetSwapState:!0,initializeSwapState:!1})),j.subscribeKey("caipAddress",i=>this.onCaipAddressChange({newCaipAddress:i,resetSwapState:!0,initializeSwapState:!1})),this.unsubscribe.push(P.subscribeKey("activeCaipNetwork",i=>this.onCaipNetworkChange({newCaipNetwork:i,resetSwapState:!1,initializeSwapState:!0})),j.subscribeKey("caipAddress",i=>this.onCaipAddressChange({newCaipAddress:i,resetSwapState:!1,initializeSwapState:!0})),M.subscribeKey("open",i=>{i||n.resetState()}),S.subscribeKey("view",i=>{i.includes("Swap")||n.resetValues()}),n.subscribe(i=>{this.initialized=i.initialized,this.loadingQuote=i.loadingQuote,this.loadingPrices=i.loadingPrices,this.loadingTransaction=i.loadingTransaction,this.sourceToken=i.sourceToken,this.sourceTokenAmount=i.sourceTokenAmount,this.sourceTokenPriceInUSD=i.sourceTokenPriceInUSD,this.toToken=i.toToken,this.toTokenAmount=i.toTokenAmount,this.toTokenPriceInUSD=i.toTokenPriceInUSD,this.inputError=i.inputError,this.fetchError=i.fetchError,i.sourceToken&&i.toToken&&this.watchTokensAndValues()}))}async firstUpdated(){n.initializeState(),this.watchTokensAndValues(),await this.handleSwapParameters()}disconnectedCallback(){this.unsubscribe.forEach(e=>e==null?void 0:e()),clearInterval(this.interval),document==null||document.removeEventListener("visibilitychange",this.visibilityChangeHandler)}render(){return u`
      <wui-flex flexDirection="column" .padding=${["0","l","l","l"]} gap="s">
        ${this.initialized?this.templateSwap():this.templateLoading()}
      </wui-flex>
    `}subscribeToVisibilityChange(){document==null||document.removeEventListener("visibilitychange",this.visibilityChangeHandler),document==null||document.addEventListener("visibilitychange",this.visibilityChangeHandler)}fetchTokensAndValues(){n.getNetworkTokenPrice(),n.getMyTokensWithBalance(),n.swapTokens(),this.lastTokenPriceUpdate=Date.now()}templateSwap(){return u`
      <wui-flex flexDirection="column" gap="s">
        <wui-flex flexDirection="column" alignItems="center" gap="xs" class="swap-inputs-container">
          ${this.templateTokenInput("sourceToken",this.sourceToken)}
          ${this.templateTokenInput("toToken",this.toToken)} ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateDetails()} ${this.templateActionButton()}
      </wui-flex>
    `}actionButtonLabel(){return this.fetchError?"Swap":!this.sourceToken||!this.toToken?"Select token":this.sourceTokenAmount?this.inputError?this.inputError:"Review swap":"Enter amount"}templateReplaceTokensButton(){return u`
      <wui-flex class="replace-tokens-button-container">
        <button @click=${this.onSwitchTokens.bind(this)}>
          <wui-icon name="recycleHorizontal" color="fg-250" size="lg"></wui-icon>
        </button>
      </wui-flex>
    `}templateLoading(){return u`
      <wui-flex flexDirection="column" gap="l">
        <wui-flex flexDirection="column" alignItems="center" gap="xs" class="swap-inputs-container">
          <w3m-swap-input-skeleton target="sourceToken"></w3m-swap-input-skeleton>
          <w3m-swap-input-skeleton target="toToken"></w3m-swap-input-skeleton>
          ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateActionButton()}
      </wui-flex>
    `}templateTokenInput(e,t){var l,x;const i=(l=n.state.myTokensWithBalance)==null?void 0:l.find(v=>(v==null?void 0:v.address)===(t==null?void 0:t.address)),a=e==="toToken"?this.toTokenAmount:this.sourceTokenAmount,o=e==="toToken"?this.toTokenPriceInUSD:this.sourceTokenPriceInUSD,r=_.parseLocalStringToNumber(a)*o;return u`<w3m-swap-input
      .value=${e==="toToken"?this.toTokenAmount:this.sourceTokenAmount}
      .disabled=${e==="toToken"}
      .onSetAmount=${this.handleChangeAmount.bind(this)}
      target=${e}
      .token=${t}
      .balance=${(x=i==null?void 0:i.quantity)==null?void 0:x.numeric}
      .price=${i==null?void 0:i.price}
      .marketValue=${r}
      .onSetMaxValue=${this.onSetMaxValue.bind(this)}
    ></w3m-swap-input>`}onSetMaxValue(e,t){const i=_.bigNumber(t||"0");this.handleChangeAmount(e,i.gt(0)?i.toFixed(20):"0")}templateDetails(){return!this.sourceToken||!this.toToken||this.inputError?null:u`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`}handleChangeAmount(e,t){n.clearError(),e==="sourceToken"?n.setSourceTokenAmount(t):n.setToTokenAmount(t),this.onDebouncedGetSwapCalldata()}templateActionButton(){const e=!this.toToken||!this.sourceToken,t=!this.sourceTokenAmount,i=this.loadingQuote||this.loadingPrices||this.loadingTransaction,a=i||e||t||this.inputError;return u` <wui-flex gap="xs">
      <wui-button
        data-testid="swap-action-button"
        class="action-button"
        fullWidth
        size="lg"
        borderRadius="xs"
        variant=${e?"neutral":"main"}
        .loading=${i}
        .disabled=${a}
        @click=${this.onSwapPreview.bind(this)}
      >
        ${this.actionButtonLabel()}
      </wui-button>
    </wui-flex>`}onSwitchTokens(){n.switchTokens()}async onSwapPreview(){var e,t;this.fetchError&&await n.swapTokens(),W.sendEvent({type:"track",event:"INITIATE_SWAP",properties:{network:this.caipNetworkId||"",swapFromToken:((e=this.sourceToken)==null?void 0:e.symbol)||"",swapToToken:((t=this.toToken)==null?void 0:t.symbol)||"",swapFromAmount:this.sourceTokenAmount||"",swapToAmount:this.toTokenAmount||"",isSmartAccount:F(P.state.activeChain)===Q.ACCOUNT_TYPES.SMART_ACCOUNT}}),S.push("SwapPreview")}async handleSwapParameters(){this.initialParams&&(n.state.initialized||await new Promise(t=>{const i=n.subscribeKey("initialized",a=>{a&&(i==null||i(),t())})}),await this.setSwapParameters(this.initialParams))}async setSwapParameters({amount:e,fromToken:t,toToken:i}){(!n.state.tokens||!n.state.myTokensWithBalance)&&await new Promise(r=>{const l=n.subscribeKey("myTokensWithBalance",x=>{x&&x.length>0&&(l==null||l(),r())});setTimeout(()=>{l==null||l(),r()},5e3)});const a=[...n.state.tokens||[],...n.state.myTokensWithBalance||[]];if(t){const o=a.find(r=>r.symbol.toLowerCase()===t.toLowerCase());o&&n.setSourceToken(o)}if(i){const o=a.find(r=>r.symbol.toLowerCase()===i.toLowerCase());o&&n.setToToken(o)}e&&!isNaN(Number(e))&&n.setSourceTokenAmount(e)}onCaipAddressChange({newCaipAddress:e,resetSwapState:t,initializeSwapState:i}){this.caipAddress!==e&&(this.caipAddress=e,t&&n.resetState(),i&&n.initializeState())}onCaipNetworkChange({newCaipNetwork:e,resetSwapState:t,initializeSwapState:i}){this.caipNetworkId!==(e==null?void 0:e.caipNetworkId)&&(this.caipNetworkId=e==null?void 0:e.caipNetworkId,t&&n.resetState(),i&&n.initializeState())}};p.styles=te;h([w({type:Object})],p.prototype,"initialParams",void 0);h([s()],p.prototype,"interval",void 0);h([s()],p.prototype,"detailsOpen",void 0);h([s()],p.prototype,"caipAddress",void 0);h([s()],p.prototype,"caipNetworkId",void 0);h([s()],p.prototype,"initialized",void 0);h([s()],p.prototype,"loadingQuote",void 0);h([s()],p.prototype,"loadingPrices",void 0);h([s()],p.prototype,"loadingTransaction",void 0);h([s()],p.prototype,"sourceToken",void 0);h([s()],p.prototype,"sourceTokenAmount",void 0);h([s()],p.prototype,"sourceTokenPriceInUSD",void 0);h([s()],p.prototype,"toToken",void 0);h([s()],p.prototype,"toTokenAmount",void 0);h([s()],p.prototype,"toTokenPriceInUSD",void 0);h([s()],p.prototype,"inputError",void 0);h([s()],p.prototype,"fetchError",void 0);h([s()],p.prototype,"lastTokenPriceUpdate",void 0);p=h([C("w3m-swap-view")],p);const ie=D`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  .preview-container,
  .details-container {
    width: 100%;
  }

  .token-image {
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: 12px;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .token-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-xxs);
    padding: var(--wui-spacing-xs);
    height: 40px;
    border: none;
    border-radius: 80px;
    background: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    cursor: pointer;
    transition: background 0.2s linear;
  }

  .token-item:hover {
    background: var(--wui-color-gray-glass-005);
  }

  .preview-token-details-container {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }

  .action-buttons-container {
    width: 100%;
    gap: var(--wui-spacing-xs);
  }

  .action-buttons-container > button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    height: 48px;
    border-radius: var(--wui-border-radius-xs);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  .action-buttons-container > button:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  .action-button > wui-loading-spinner {
    display: inline-block;
  }

  .cancel-button:hover,
  .action-button:hover {
    cursor: pointer;
  }

  .action-buttons-container > wui-button.cancel-button {
    flex: 2;
  }

  .action-buttons-container > wui-button.action-button {
    flex: 4;
  }

  .action-buttons-container > button.action-button > wui-text {
    color: white;
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    transition: background 0.2s linear;
  }

  .details-container > wui-flex > button:hover {
    background: var(--wui-color-gray-glass-002);
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }
`;var g=function(c,e,t,i){var a=arguments.length,o=a<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(c,e,t,i);else for(var l=c.length-1;l>=0;l--)(r=c[l])&&(o=(a<3?r(o):a>3?r(e,t,o):r(e,t))||o);return a>3&&o&&Object.defineProperty(e,t,o),o};let d=class extends U{constructor(){super(),this.unsubscribe=[],this.detailsOpen=!0,this.approvalTransaction=n.state.approvalTransaction,this.swapTransaction=n.state.swapTransaction,this.sourceToken=n.state.sourceToken,this.sourceTokenAmount=n.state.sourceTokenAmount??"",this.sourceTokenPriceInUSD=n.state.sourceTokenPriceInUSD,this.toToken=n.state.toToken,this.toTokenAmount=n.state.toTokenAmount??"",this.toTokenPriceInUSD=n.state.toTokenPriceInUSD,this.caipNetwork=P.state.activeCaipNetwork,this.balanceSymbol=j.state.balanceSymbol,this.inputError=n.state.inputError,this.loadingQuote=n.state.loadingQuote,this.loadingApprovalTransaction=n.state.loadingApprovalTransaction,this.loadingBuildTransaction=n.state.loadingBuildTransaction,this.loadingTransaction=n.state.loadingTransaction,this.unsubscribe.push(j.subscribeKey("balanceSymbol",e=>{this.balanceSymbol!==e&&S.goBack()}),P.subscribeKey("activeCaipNetwork",e=>{this.caipNetwork!==e&&(this.caipNetwork=e)}),n.subscribe(e=>{this.approvalTransaction=e.approvalTransaction,this.swapTransaction=e.swapTransaction,this.sourceToken=e.sourceToken,this.toToken=e.toToken,this.toTokenPriceInUSD=e.toTokenPriceInUSD,this.sourceTokenAmount=e.sourceTokenAmount??"",this.toTokenAmount=e.toTokenAmount??"",this.inputError=e.inputError,e.inputError&&S.goBack(),this.loadingQuote=e.loadingQuote,this.loadingApprovalTransaction=e.loadingApprovalTransaction,this.loadingBuildTransaction=e.loadingBuildTransaction,this.loadingTransaction=e.loadingTransaction}))}firstUpdated(){n.getTransaction(),this.refreshTransaction()}disconnectedCallback(){this.unsubscribe.forEach(e=>e==null?void 0:e()),clearInterval(this.interval)}render(){return u`
      <wui-flex flexDirection="column" .padding=${["0","l","l","l"]} gap="s">
        ${this.templateSwap()}
      </wui-flex>
    `}refreshTransaction(){this.interval=setInterval(()=>{n.getApprovalLoadingState()||n.getTransaction()},1e4)}templateSwap(){var x,v,L,E;const e=`${m.formatNumberToLocalString(parseFloat(this.sourceTokenAmount))} ${(x=this.sourceToken)==null?void 0:x.symbol}`,t=`${m.formatNumberToLocalString(parseFloat(this.toTokenAmount))} ${(v=this.toToken)==null?void 0:v.symbol}`,i=parseFloat(this.sourceTokenAmount)*this.sourceTokenPriceInUSD,a=parseFloat(this.toTokenAmount)*this.toTokenPriceInUSD,o=m.formatNumberToLocalString(i),r=m.formatNumberToLocalString(a),l=this.loadingQuote||this.loadingBuildTransaction||this.loadingTransaction||this.loadingApprovalTransaction;return u`
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        <wui-flex class="preview-container" flexDirection="column" alignItems="flex-start" gap="l">
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="l"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="4xs">
              <wui-text variant="small-400" color="fg-150">Send</wui-text>
              <wui-text variant="paragraph-400" color="fg-100">$${o}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${e}
              imageSrc=${(L=this.sourceToken)==null?void 0:L.logoUri}
            >
            </wui-token-button>
          </wui-flex>
          <wui-icon name="recycleHorizontal" color="fg-200" size="md"></wui-icon>
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="l"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="4xs">
              <wui-text variant="small-400" color="fg-150">Receive</wui-text>
              <wui-text variant="paragraph-400" color="fg-100">$${r}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${t}
              imageSrc=${(E=this.toToken)==null?void 0:E.logoUri}
            >
            </wui-token-button>
          </wui-flex>
        </wui-flex>

        ${this.templateDetails()}

        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="xs">
          <wui-icon size="sm" color="fg-200" name="infoCircle"></wui-icon>
          <wui-text variant="small-400" color="fg-200">Review transaction carefully</wui-text>
        </wui-flex>

        <wui-flex
          class="action-buttons-container"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="xs"
        >
          <wui-button
            class="cancel-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="neutral"
            @click=${this.onCancelTransaction.bind(this)}
          >
            <wui-text variant="paragraph-600" color="fg-200">Cancel</wui-text>
          </wui-button>
          <wui-button
            class="action-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="main"
            ?loading=${l}
            ?disabled=${l}
            @click=${this.onSendTransaction.bind(this)}
          >
            <wui-text variant="paragraph-600" color="inverse-100">
              ${this.actionButtonLabel()}
            </wui-text>
          </wui-button>
        </wui-flex>
      </wui-flex>
    `}templateDetails(){return!this.sourceToken||!this.toToken||this.inputError?null:u`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`}actionButtonLabel(){return this.loadingApprovalTransaction?"Approving...":this.approvalTransaction?"Approve":"Swap"}onCancelTransaction(){S.goBack()}onSendTransaction(){this.approvalTransaction?n.sendTransactionForApproval(this.approvalTransaction):n.sendTransactionForSwap(this.swapTransaction)}};d.styles=ie;g([s()],d.prototype,"interval",void 0);g([s()],d.prototype,"detailsOpen",void 0);g([s()],d.prototype,"approvalTransaction",void 0);g([s()],d.prototype,"swapTransaction",void 0);g([s()],d.prototype,"sourceToken",void 0);g([s()],d.prototype,"sourceTokenAmount",void 0);g([s()],d.prototype,"sourceTokenPriceInUSD",void 0);g([s()],d.prototype,"toToken",void 0);g([s()],d.prototype,"toTokenAmount",void 0);g([s()],d.prototype,"toTokenPriceInUSD",void 0);g([s()],d.prototype,"caipNetwork",void 0);g([s()],d.prototype,"balanceSymbol",void 0);g([s()],d.prototype,"inputError",void 0);g([s()],d.prototype,"loadingQuote",void 0);g([s()],d.prototype,"loadingApprovalTransaction",void 0);g([s()],d.prototype,"loadingBuildTransaction",void 0);g([s()],d.prototype,"loadingTransaction",void 0);d=g([C("w3m-swap-preview-view")],d);const oe=D`
  :host {
    height: 60px;
    min-height: 60px;
  }

  :host > wui-flex {
    cursor: pointer;
    height: 100%;
    display: flex;
    column-gap: var(--wui-spacing-s);
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-l);
    width: 100%;
    background-color: transparent;
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      background-color var(--wui-ease-out-power-1) var(--wui-duration-lg),
      opacity var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color, opacity;
  }

  @media (hover: hover) and (pointer: fine) {
    :host > wui-flex:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    :host > wui-flex:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  :host([disabled]) > wui-flex {
    opacity: 0.6;
  }

  :host([disabled]) > wui-flex:hover {
    background-color: transparent;
  }

  :host > wui-flex > wui-flex {
    flex: 1;
  }

  :host > wui-flex > wui-image,
  :host > wui-flex > .token-item-image-placeholder {
    width: 40px;
    max-width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-3xl);
    position: relative;
  }

  :host > wui-flex > .token-item-image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host > wui-flex > wui-image::after,
  :host > wui-flex > .token-item-image-placeholder::after {
    position: absolute;
    content: '';
    inset: 0;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-l);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }
`;var A=function(c,e,t,i){var a=arguments.length,o=a<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(c,e,t,i);else for(var l=c.length-1;l>=0;l--)(r=c[l])&&(o=(a<3?r(o):a>3?r(e,t,o):r(e,t))||o);return a>3&&o&&Object.defineProperty(e,t,o),o};let $=class extends U{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.imageSrc=void 0,this.name=void 0,this.symbol=void 0,this.price=void 0,this.amount=void 0,this.visible=!1,this.imageError=!1,this.observer=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting?this.visible=!0:this.visible=!1})},{threshold:.1})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){var t;if(!this.visible)return null;const e=this.amount&&this.price?(t=_.multiply(this.price,this.amount))==null?void 0:t.toFixed(3):null;return u`
      <wui-flex alignItems="center">
        ${this.visualTemplate()}
        <wui-flex flexDirection="column" gap="3xs">
          <wui-flex justifyContent="space-between">
            <wui-text variant="paragraph-500" color="fg-100" lineClamp="1">${this.name}</wui-text>
            ${e?u`
                  <wui-text variant="paragraph-500" color="fg-100">
                    $${m.formatNumberToLocalString(e,3)}
                  </wui-text>
                `:null}
          </wui-flex>
          <wui-flex justifyContent="space-between">
            <wui-text variant="small-400" color="fg-200" lineClamp="1">${this.symbol}</wui-text>
            ${this.amount?u`<wui-text variant="small-400" color="fg-200">
                  ${m.formatNumberToLocalString(this.amount,3)}
                </wui-text>`:null}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}visualTemplate(){return this.imageError?u`<wui-flex class="token-item-image-placeholder">
        <wui-icon name="image" color="inherit"></wui-icon>
      </wui-flex>`:this.imageSrc?u`<wui-image
        width="40"
        height="40"
        src=${this.imageSrc}
        @onLoadError=${this.imageLoadError}
      ></wui-image>`:null}imageLoadError(){this.imageError=!0}};$.styles=[H,q,oe];A([w()],$.prototype,"imageSrc",void 0);A([w()],$.prototype,"name",void 0);A([w()],$.prototype,"symbol",void 0);A([w()],$.prototype,"price",void 0);A([w()],$.prototype,"amount",void 0);A([s()],$.prototype,"visible",void 0);A([s()],$.prototype,"imageError",void 0);$=A([C("wui-token-list-item")],$);const ne=D`
  :host {
    --tokens-scroll--top-opacity: 0;
    --tokens-scroll--bottom-opacity: 1;
    --suggested-tokens-scroll--left-opacity: 0;
    --suggested-tokens-scroll--right-opacity: 1;
  }

  :host > wui-flex:first-child {
    overflow-y: hidden;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-height: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .suggested-tokens-container {
    overflow-x: auto;
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--suggested-tokens-scroll--right-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--right-opacity))) 100%
    );
  }

  .suggested-tokens-container::-webkit-scrollbar {
    display: none;
  }

  .tokens-container {
    border-top: 1px solid var(--wui-color-gray-glass-005);
    height: 100%;
    max-height: 390px;
  }

  .tokens {
    width: 100%;
    overflow-y: auto;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--top-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--tokens-scroll--top-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--tokens-scroll--bottom-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--bottom-opacity))) 100%
    );
  }

  .network-search-input,
  .select-network-button {
    height: 40px;
  }

  .select-network-button {
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: transparent;
    border-radius: var(--wui-border-radius-xxs);
    padding: var(--wui-spacing-xs);
    align-items: center;
    transition: background-color 0.2s linear;
  }

  .select-network-button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  .select-network-button > wui-image {
    width: 26px;
    height: 26px;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }
`;var I=function(c,e,t,i){var a=arguments.length,o=a<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(c,e,t,i);else for(var l=c.length-1;l>=0;l--)(r=c[l])&&(o=(a<3?r(o):a>3?r(e,t,o):r(e,t))||o);return a>3&&o&&Object.defineProperty(e,t,o),o};let T=class extends U{constructor(){var e;super(),this.unsubscribe=[],this.targetToken=(e=S.state.data)==null?void 0:e.target,this.sourceToken=n.state.sourceToken,this.sourceTokenAmount=n.state.sourceTokenAmount,this.toToken=n.state.toToken,this.myTokensWithBalance=n.state.myTokensWithBalance,this.popularTokens=n.state.popularTokens,this.searchValue="",this.unsubscribe.push(n.subscribe(t=>{this.sourceToken=t.sourceToken,this.toToken=t.toToken,this.myTokensWithBalance=t.myTokensWithBalance}))}updated(){var i,a;const e=(i=this.renderRoot)==null?void 0:i.querySelector(".suggested-tokens-container");e==null||e.addEventListener("scroll",this.handleSuggestedTokensScroll.bind(this));const t=(a=this.renderRoot)==null?void 0:a.querySelector(".tokens");t==null||t.addEventListener("scroll",this.handleTokenListScroll.bind(this))}disconnectedCallback(){var i,a;super.disconnectedCallback();const e=(i=this.renderRoot)==null?void 0:i.querySelector(".suggested-tokens-container"),t=(a=this.renderRoot)==null?void 0:a.querySelector(".tokens");e==null||e.removeEventListener("scroll",this.handleSuggestedTokensScroll.bind(this)),t==null||t.removeEventListener("scroll",this.handleTokenListScroll.bind(this)),clearInterval(this.interval)}render(){return u`
      <wui-flex flexDirection="column" gap="s">
        ${this.templateSearchInput()} ${this.templateSuggestedTokens()} ${this.templateTokens()}
      </wui-flex>
    `}onSelectToken(e){this.targetToken==="sourceToken"?n.setSourceToken(e):(n.setToToken(e),this.sourceToken&&this.sourceTokenAmount&&n.swapTokens()),S.goBack()}templateSearchInput(){return u`
      <wui-flex .padding=${["3xs","s","0","s"]} gap="xs">
        <wui-input-text
          data-testid="swap-select-token-search-input"
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
          .value=${this.searchValue}
          @inputChange=${this.onSearchInputChange.bind(this)}
        ></wui-input-text>
      </wui-flex>
    `}templateTokens(){const e=this.myTokensWithBalance?Object.values(this.myTokensWithBalance):[],t=this.popularTokens?this.popularTokens:[],i=this.filterTokensWithText(e,this.searchValue),a=this.filterTokensWithText(t,this.searchValue);return u`
      <wui-flex class="tokens-container">
        <wui-flex class="tokens" .padding=${["0","s","s","s"]} flexDirection="column">
          ${(i==null?void 0:i.length)>0?u`
                <wui-flex justifyContent="flex-start" padding="s">
                  <wui-text variant="paragraph-500" color="fg-200">Your tokens</wui-text>
                </wui-flex>
                ${i.map(o=>{var l,x,v;const r=o.symbol===((l=this.sourceToken)==null?void 0:l.symbol)||o.symbol===((x=this.toToken)==null?void 0:x.symbol);return u`
                    <wui-token-list-item
                      data-testid="swap-select-token-item-${o.symbol}"
                      name=${o.name}
                      ?disabled=${r}
                      symbol=${o.symbol}
                      price=${o==null?void 0:o.price}
                      amount=${(v=o==null?void 0:o.quantity)==null?void 0:v.numeric}
                      imageSrc=${o.logoUri}
                      @click=${()=>{r||this.onSelectToken(o)}}
                    >
                    </wui-token-list-item>
                  `})}
              `:null}

          <wui-flex justifyContent="flex-start" padding="s">
            <wui-text variant="paragraph-500" color="fg-200">Tokens</wui-text>
          </wui-flex>
          ${(a==null?void 0:a.length)>0?a.map(o=>u`
                  <wui-token-list-item
                    data-testid="swap-select-token-item-${o.symbol}"
                    name=${o.name}
                    symbol=${o.symbol}
                    imageSrc=${o.logoUri}
                    @click=${()=>this.onSelectToken(o)}
                  >
                  </wui-token-list-item>
                `):null}
        </wui-flex>
      </wui-flex>
    `}templateSuggestedTokens(){const e=n.state.suggestedTokens?n.state.suggestedTokens.slice(0,8):null;return e?u`
      <wui-flex class="suggested-tokens-container" .padding=${["0","s","0","s"]} gap="xs">
        ${e.map(t=>u`
            <wui-token-button
              text=${t.symbol}
              imageSrc=${t.logoUri}
              @click=${()=>this.onSelectToken(t)}
            >
            </wui-token-button>
          `)}
      </wui-flex>
    `:null}onSearchInputChange(e){this.searchValue=e.detail}handleSuggestedTokensScroll(){var t;const e=(t=this.renderRoot)==null?void 0:t.querySelector(".suggested-tokens-container");e&&(e.style.setProperty("--suggested-tokens-scroll--left-opacity",R.interpolate([0,100],[0,1],e.scrollLeft).toString()),e.style.setProperty("--suggested-tokens-scroll--right-opacity",R.interpolate([0,100],[0,1],e.scrollWidth-e.scrollLeft-e.offsetWidth).toString()))}handleTokenListScroll(){var t;const e=(t=this.renderRoot)==null?void 0:t.querySelector(".tokens");e&&(e.style.setProperty("--tokens-scroll--top-opacity",R.interpolate([0,100],[0,1],e.scrollTop).toString()),e.style.setProperty("--tokens-scroll--bottom-opacity",R.interpolate([0,100],[0,1],e.scrollHeight-e.scrollTop-e.offsetHeight).toString()))}filterTokensWithText(e,t){return e.filter(i=>`${i.symbol} ${i.name} ${i.address}`.toLowerCase().includes(t.toLowerCase()))}};T.styles=ne;I([s()],T.prototype,"interval",void 0);I([s()],T.prototype,"targetToken",void 0);I([s()],T.prototype,"sourceToken",void 0);I([s()],T.prototype,"sourceTokenAmount",void 0);I([s()],T.prototype,"toToken",void 0);I([s()],T.prototype,"myTokensWithBalance",void 0);I([s()],T.prototype,"popularTokens",void 0);I([s()],T.prototype,"searchValue",void 0);T=I([C("w3m-swap-select-token-view")],T);export{d as W3mSwapPreviewView,T as W3mSwapSelectTokenView,p as W3mSwapView};
