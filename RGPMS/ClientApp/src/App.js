import React, { Component } from 'react';
import { Route, Link ,Switch,Redirect,withRouter} from 'react-router-dom';
import classNames from 'classnames';
import 'nanoscroller';
import jQuery from "jquery";
import './resources/style/primereact.css';
import 'nanoscroller/bin/css/nanoscroller.css';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.css';
import 'primeicons/primeicons.css';
import 'prismjs/themes/prism-coy.css';
import './sass/App.css';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';
import { AutoCompleteDemo } from './showcase/autocomplete/AutoCompleteDemo';
import { HomeComponent } from './showcase/home/HomeComponent';
import { InputTextDemo } from './showcase/inputtext/InputTextDemo';
import { DataTableDemo } from './showcase/datatable/DataTableDemo';
import { DataTableLazyDemo } from './showcase/datatable/DataTableLazyDemo';
import { DataTableExportDemo } from './showcase/datatable/DataTableExportDemo';
import { DataTableCrudDemo } from './showcase/datatable/DataTableCrudDemo';
import { DataTableTemplatingDemo } from './showcase/datatable/DataTableTemplatingDemo';
import { DataTablePaginatorDemo } from './showcase/datatable/DataTablePaginatorDemo';
import { DataTableSortDemo } from './showcase/datatable/DataTableSortDemo';
import { DataTableFilterDemo } from './showcase/datatable/DataTableFilterDemo';
import { DataTableColTogglerDemo } from './showcase/datatable/DataTableColTogglerDemo';
import { DataTableScrollDemo } from './showcase/datatable/DataTableScrollDemo';
import { DataTableSelectionDemo } from './showcase/datatable/DataTableSelectionDemo';
import { DataTableColGroupDemo } from './showcase/datatable/DataTableColGroupDemo';
import { DataTableRowExpansionDemo } from './showcase/datatable/DataTableRowExpansionDemo';
import { DataTableColResizeDemo } from './showcase/datatable/DataTableColResizeDemo';
import { DataTableReorderDemo } from './showcase/datatable/DataTableReorderDemo';
import { DataTableContextMenuDemo } from './showcase/datatable/DataTableContextMenuDemo';
import { DataTableResponsiveDemo } from './showcase/datatable/DataTableResponsiveDemo';
import { DataTableEditDemo } from './showcase/datatable/DataTableEditDemo';
import { DataTableRowGroupDemo } from './showcase/datatable/DataTableRowGroupDemo';
import { DataTableStyleDemo } from './showcase/datatable/DataTableStyleDemo';
import {DialogDemo} from './showcase/dialog/DialogDemo';
import {DropdownDemo} from './showcase/dropdown/DropdownDemo';
import {ButtonDemo} from './showcase/button/ButtonDemo';
import {CheckboxDemo} from './showcase/checkbox/CheckboxDemo'; 
import {RadioButtonDemo} from './showcase/radiobutton/RadioButtonDemo';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
class AppMenu extends Component {

    constructor() {
        super();
        this.state = { activeMenu: -1 };
    }

    openMenu(event, val) {
        this.setState({ activeMenu:this.state.activeMenu===val?-1: val });
        setTimeout(() => jQuery(this.scrollContainer).nanoScroller(), 350);
        event.preventDefault();
    }

    componentDidMount() {
        jQuery(this.scrollContainer).nanoScroller({ flash: true });
     
          
    }

    componentWillUnmount() {
        jQuery(this.scrollContainer).nanoScroller({ destroy: true });
    }

    render() {
        return (
            <div ref={(el) => this.scrollContainer = el} className="nano">
                <div className="nano-content">
                    <div className="layout-menu">
                        <a id="menu_input"  onClick={(event) => this.openMenu(event, 0)} className={classNames({ 'active-menuitem': this.state.activeMenu === 0 })}>
                            <img alt="input" className="layout-menu-icon-inactive" src="showcase/resources/images/mono/input.svg"></img>
                            <img alt="input" className="layout-menu-icon-active" src="showcase/resources/images/mono/input-active.svg"></img>
                            <span>Input</span>
                        </a>
                        <div className={classNames({ 'submenuhide': this.state.activeMenu !== 0, 'submenushow': this.state.activeMenu === 0 })}>
                            <div>
                                <Link to="/inputtext">&#9679; InputText</Link>
                                <Link to="/button">&#9679; Button</Link>
                                <Link to="/checkbox">&#9679; CheckBox</Link>
                                <Link to="/dropdown">&#9679; DropDown</Link>
                                <Link to="/radiobutton">&#9679; RadioButton</Link>
                                <Link to="/login">&#9679; login</Link>
                                <Link to="/autocomplete">&#9679; AutoComplete</Link>
                                <Link to="/datatable">&#9679; DataTable</Link>
                                <Link to="/dialog">&#9679; Dialog</Link>
                                <Link to="/order">&#9679; Dialog</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

class App extends Component {

    constructor() {
        super();
        this.state = {};
        this.theme = 'omega';
        this.changeTheme = this.changeTheme.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
    }
    componentDidMount(){
               this.props.onTryAutoSignup();
    }

    changeTheme(event) {
        var theme = event.currentTarget.dataset.theme;
        var themeElement = document.getElementById('theme-link');
        var oldThemeURL = themeElement.getAttribute('href');
        var newThemeURL = oldThemeURL.replace(this.theme, theme);
        this.theme = theme;
        themeElement.setAttribute('href', newThemeURL);
        event.preventDefault();
    }

    openMenu(event) {
        this.setState({ menuActive:!this.state.menuActive });
        event.preventDefault();
    }

    closeMenu(event) {
        this.setState({ menuActive:false});
        event.preventDefault();
    }

    onSidebarClick(event) {
        if (event.target.nodeName === 'A' && event.target.parentNode.className.indexOf('layout-menu') === -1) {
            this.closeMenu(event);
        }
    }

    render() {
        
        let routes = (
            <Switch>
              <Route path="/login" component={Auth} />
              <Redirect to="/login" />
         
            </Switch>
          );
          if(this.props.isAuthenticated)
          {

              routes=(
                      <Switch>
                <div className='layout-wrapper'>
                <div id="layout-topbar">
                    <a className="menu-button" onClick={this.openMenu}>
                        <i className="fa fa-bars"></i>
                    </a>
                    <Link to="/" className="logo">
                        <img alt="logo"   src="showcase/resources/images/logo.png" />
                    </Link>

                    <ul className="topbar-menu">
                        <li>
                            <Link to="/" > BURGER </Link>
                        </li>
                        <li>
                            <Link to="/order">ORDER</Link>
                        </li>
                        <li>
                            <Link to="/logout">LOGOUT</Link>
                        </li>
                    </ul>
                </div>

                <div id="layout-sidebar" className={classNames({ 'active': this.state.menuActive === true })} onClick={this.onSidebarClick}>
                    <AppMenu />
                </div>

                <div className={classNames({ 'layout-mask': this.state.menuActive === true })}>
                </div>


                <div id="layout-content">
                  
                    <Route exact path="/" component={BurgerBuilder} />
          <         Route path="/checkout" component={Checkout} />
                    <Route path="/inputtext" component={InputTextDemo} />
                    <Route path="/button" component={ButtonDemo} />
                    <Route path="/checkbox" component={CheckboxDemo} />
                    <Route path="/autocomplete" component={AutoCompleteDemo} />
                    <Route path="/radiobutton" component={RadioButtonDemo}/>
                    <Route path="/dialog" component={DialogDemo} />
                    <Route path="/dialog" component={DialogDemo} />
                    <Route exact path="/datatable" component={DataTableDemo} />
                    <Route path="/datatable/templating" component={DataTableTemplatingDemo} />
                    <Route path="/datatable/paginator" component={DataTablePaginatorDemo} />
                    <Route path="/datatable/sort" component={DataTableSortDemo} />
                    <Route path="/datatable/filter" component={DataTableFilterDemo} />
                    <Route path="/datatable/scroll" component={DataTableScrollDemo} />
                    <Route path="/datatable/lazy" component={DataTableLazyDemo} />
                    <Route path="/datatable/selection" component={DataTableSelectionDemo} />
                    <Route path="/datatable/colgroup" component={DataTableColGroupDemo} />
                    <Route path="/datatable/contextmenu" component={DataTableContextMenuDemo} />
                    <Route path="/datatable/coltoggle" component={DataTableColTogglerDemo} />
                    <Route path="/datatable/rowexpand" component={DataTableRowExpansionDemo} />
                    <Route path="/datatable/responsive" component={DataTableResponsiveDemo} />
                    <Route path="/datatable/colresize" component={DataTableColResizeDemo} />
                    <Route path="/datatable/reorder" component={DataTableReorderDemo} />
                    <Route path="/datatable/export" component={DataTableExportDemo} />
                    <Route path="/datatable/edit" component={DataTableEditDemo} />
                    <Route path="/datatable/rowgroup" component={DataTableRowGroupDemo} />
                    <Route path="/datatable/crud" component={DataTableCrudDemo} />
                    <Route path="/datatable/style" component={DataTableStyleDemo} />
                    <Route path="/dropdown" component={DropdownDemo} />
                    <Route path="/login" component={Auth} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/order" component={Orders} />
                    <Redirect to='/'/>
                </div>
                 </div>
                 </Switch>
              )
          }
        return (
            <div>
           {routes}
           </div>
        );
    }
    
}
const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch( actions.authCheckState() )
    };
  };
  
  export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
