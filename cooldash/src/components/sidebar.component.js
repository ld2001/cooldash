import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
 
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


export default class Sidebar extends Component {

    state = {
        expanded: 'false'
    }
    
    render() { 
        return (
            <SideNav onToggle= {() => {
                if (this.state.expanded == 'false') {
                    document.getElementById('root').style.marginLeft = '240px';
                    this.state.expanded = 'true';
                } else {
                    document.getElementById('root').style.marginLeft = '64px';
                    this.state.expanded = 'false';
                }
            }}>
                <SideNav.Toggle/>
                <SideNav.Nav>
                    <NavItem eventKey="dashboard">
                        <NavIcon>
                            <Link to="/">
                                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                            </Link>
                        </NavIcon>
                        <NavText>
                            <Link to="/" style={{textDecoration: 'none'}}>Dashboard</Link>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="admin">
                        <NavIcon>
                            <Link to="/admin">
                                <i className="fa fa-fw fa-list-alt" style={{ fontSize: '1.75em' }} />
                            </Link>
                        </NavIcon>
                        <NavText>
                            <Link to="/admin" style={{textDecoration: 'none'}}>Admin</Link>
                        </NavText>
                        <NavItem eventKey="trades">
                            <NavText>
                                Trades
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="model">
                            <NavText>
                                Model
                            </NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        );
    }
}