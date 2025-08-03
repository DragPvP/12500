import{i as y,Q as $,T as R,V as C,c as k,a as N,x as l,J as m,v as d,E as h,X as f,Y as I,Z as x,$ as A,O as T,W as O,R as S,y as E,a0 as g}from"./index-CFWdg3Ve.js";const _=y`
  button {
    display: flex;
    gap: var(--wui-spacing-xl);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    padding: var(--wui-spacing-m) var(--wui-spacing-s);
  }

  wui-text {
    width: 100%;
  }

  wui-flex {
    width: auto;
  }

  .network-icon {
    width: var(--wui-spacing-2l);
    height: var(--wui-spacing-2l);
    border-radius: calc(var(--wui-spacing-2l) / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-002),
      0 0 0 3px var(--wui-color-modal-bg);
  }
`;var b=function(n,e,r,t){var s=arguments.length,i=s<3?e:t===null?t=Object.getOwnPropertyDescriptor(e,r):t,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(n,e,r,t);else for(var a=n.length-1;a>=0;a--)(o=n[a])&&(i=(s<3?o(i):s>3?o(e,r,i):o(e,r))||i);return s>3&&i&&Object.defineProperty(e,r,i),i};let p=class extends N{constructor(){super(...arguments),this.networkImages=[""],this.text=""}render(){return l`
      <button>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
        <wui-flex gap="3xs" alignItems="center">
          ${this.networksTemplate()}
          <wui-icon name="chevronRight" size="sm" color="fg-200"></wui-icon>
        </wui-flex>
      </button>
    `}networksTemplate(){const e=this.networkImages.slice(0,5);return l` <wui-flex class="networks">
      ${e==null?void 0:e.map(r=>l` <wui-flex class="network-icon"> <wui-image src=${r}></wui-image> </wui-flex>`)}
    </wui-flex>`}};p.styles=[$,R,_];b([C({type:Array})],p.prototype,"networkImages",void 0);b([C()],p.prototype,"text",void 0);p=b([k("wui-compatible-network")],p);const W=y`
  wui-compatible-network {
    margin-top: var(--wui-spacing-l);
  }
`;var w=function(n,e,r,t){var s=arguments.length,i=s<3?e:t===null?t=Object.getOwnPropertyDescriptor(e,r):t,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(n,e,r,t);else for(var a=n.length-1;a>=0;a--)(o=n[a])&&(i=(s<3?o(i):s>3?o(e,r,i):o(e,r))||i);return s>3&&i&&Object.defineProperty(e,r,i),i};let u=class extends N{constructor(){super(),this.unsubscribe=[],this.address=m.state.address,this.profileName=m.state.profileName,this.network=d.state.activeCaipNetwork,this.unsubscribe.push(m.subscribe(e=>{e.address?(this.address=e.address,this.profileName=e.profileName):h.showError("Account not found")}),d.subscribeKey("activeCaipNetwork",e=>{e!=null&&e.id&&(this.network=e)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!this.address)throw new Error("w3m-wallet-receive-view: No account provided");const e=f.getNetworkImage(this.network);return l` <wui-flex
      flexDirection="column"
      .padding=${["0","l","l","l"]}
      alignItems="center"
    >
      <wui-chip-button
        data-testid="receive-address-copy-button"
        @click=${this.onCopyClick.bind(this)}
        text=${I.getTruncateString({string:this.profileName||this.address||"",charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
        icon="copy"
        size="sm"
        imageSrc=${e||""}
        variant="gray"
      ></wui-chip-button>
      <wui-flex
        flexDirection="column"
        .padding=${["l","0","0","0"]}
        alignItems="center"
        gap="s"
      >
        <wui-qr-code
          size=${232}
          theme=${x.state.themeMode}
          uri=${this.address}
          ?arenaClear=${!0}
          color=${A(x.state.themeVariables["--w3m-qr-color"])}
          data-testid="wui-qr-code"
        ></wui-qr-code>
        <wui-text variant="paragraph-500" color="fg-100" align="center">
          Copy your address or scan this QR code
        </wui-text>
      </wui-flex>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){var a;const e=d.getAllRequestedCaipNetworks(),r=d.checkIfSmartAccountEnabled(),t=d.state.activeCaipNetwork,s=e.filter(c=>(c==null?void 0:c.chainNamespace)===(t==null?void 0:t.chainNamespace));if(T(t==null?void 0:t.chainNamespace)===O.ACCOUNT_TYPES.SMART_ACCOUNT&&r)return t?l`<wui-compatible-network
        @click=${this.onReceiveClick.bind(this)}
        text="Only receive assets on this network"
        .networkImages=${[f.getNetworkImage(t)??""]}
      ></wui-compatible-network>`:null;const o=((a=s==null?void 0:s.filter(c=>{var v;return(v=c==null?void 0:c.assets)==null?void 0:v.imageId}))==null?void 0:a.slice(0,5)).map(f.getNetworkImage).filter(Boolean);return l`<wui-compatible-network
      @click=${this.onReceiveClick.bind(this)}
      text="Only receive assets on these networks"
      .networkImages=${o}
    ></wui-compatible-network>`}onReceiveClick(){S.push("WalletCompatibleNetworks")}onCopyClick(){try{this.address&&(E.copyToClopboard(this.address),h.showSuccess("Address copied"))}catch{h.showError("Failed to copy")}}};u.styles=W;w([g()],u.prototype,"address",void 0);w([g()],u.prototype,"profileName",void 0);w([g()],u.prototype,"network",void 0);u=w([k("w3m-wallet-receive-view")],u);export{u as W3mWalletReceiveView};
