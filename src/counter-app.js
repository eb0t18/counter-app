import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.count = 0;
    this.min = -25;
    this.max = 25;
    this.fancy = false;
  }

  static get properties() {
    return {
      title: { type: String },
      count: {type: Number, reflect: true},
      min: {type: Number},
      max: {type: Number},
      fancy: { type: Boolean, reflect: true },
      fire: { type: Boolean, reflect: true },
      uhoh: { type: Boolean, reflect: true },
     
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-xl));
      }

      :host([fancy]) {
      display: block;
      background-color: var(--ddd-theme-default-athertonViolet);
      }
      :host([fire]) {
      display: block;
      background-color: var(--ddd-theme-default-wonderPurple);
      }
      :host([uhoh]) {
      display: block;
      background-color: var(--ddd-theme-default-original87Pink);
      }

      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      div {
        padding: 0;
        margin: 0;
      }

      button:hover{
        background-color: var(--ddd-theme-default-globalNeon);

      }

      button:focus{
        background-color: var(--ddd-theme-default-beaver70);

      }
    `];
  }

  
updated(changedProperties) {
  if (changedProperties.has('count') && this.count===21) {
    this.makeItRain();
  }
}

makeItRain() {
  import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
    (module) => {
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    }
  );
}

  increment(e){
      this.count++
    

    if(this.count ==18)
    {
      this.uhoh = false;
      this.fire = false;
      this.fancy = true;
    }

    if(this.count ==21)
    {
      
      this.fancy = false;
      this.uhoh = false;
      this.fire = true;
    }

    if(this.count == this.max)
    {
      this.fancy = false;
      this.fire = false;
      this.uhoh = true
    }

  
  }

  decrement(e){
   
     this.count--;

    if(this.count ==18)
      {
        this.uhoh = false;
        this.fire = false;
        this.fancy = true;
      }
  
      if(this.count ==21)
      {
        this.fancy = false;
        this.uhoh = false;
        this.fire = true;
      }
  
      if(this.count == this.max)
      {
        this.fancy = false;
        this.fire = false;
        this.uhoh = true
      }

      if(this.count == this.min)
      {
        this.fancy = false;
        this.uhoh = true;
      }


    
    
  
  }

  render() {
    return html`
<confetti-container id="confetti">
<div class="wrapper">
  <div>${this.count}</div>
  <button ?disabled="${this.min === this.count}" @click="${this.decrement}">-</button>
  <button ?disabled="${this.max === this.count}" @click="${this.increment}">+</button>
  <div>${this.title}</div>
  <slot></slot>
</div></confetti-container>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);