'use strict';
/* @jsx React.DOM */
var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var Strings = require('../strings');

module.exports = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("PortfolioStore")],
  render: function() {
    return (
      <div className="about">
        <img src="./public/images/profile.jpg"/>
        <div className="about-text">
          <h3>About</h3>
          <p>{Strings.about}</p>
          <p>{Strings.aboutFooter}</p>
          <p>Check out my <a href="./public/docs/resume.pdf">Resume</a> or shoot me an email at <a>jmp3833@rit.edu</a></p><br></br>
          <div className="about-links">
            <a className="social" href="https://github.com/jmp3833"><i className="fa fa-github fa-2x"></i></a>
            <a className="social" href="https://www.linkedin.com/in/jmp3833"><i className="fa fa-linkedin fa-2x"></i></a>
            <a className="social" href="https://twitter.com/JPeterson__"><i className="fa fa-twitter fa-2x"></i></a>
            <hr className="sidebar-content-separator"></hr>
          </div>
        </div>
        <div className="sidebar-blog-tags">
          <h3>Tags</h3>
          <ul>
            <li><a className="social" onClick={this.getNewest}>Newest</a></li>
            <li><a className="social" onClick={this.getNewest}>All</a></li>
            <li><a className="social" onClick={this.getNewest}>2015</a></li>
          </ul>
        </div>
        <hr className="sidebar-content-separator"></hr>
        <div className="sidebar-recent-posts">
          <ul>
            {
              this.state.sidebarContent.map(function(item, index) {
                return (
                  <li><a className="social" href={"/#/" + item._id.slice(0,-3)}>{item.title}</a></li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  },

  getNewest: function(e) {
    this.getFlux().actions.getNewestPosts();
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("PortfolioStore").getState();
  }
});
