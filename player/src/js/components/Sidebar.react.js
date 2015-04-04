'use strict';
/* @jsx React.DOM */
var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var Strings = require('../strings');
var $ = require('jquery');

module.exports = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("PortfolioStore")],
  render: function() {
    var TagsAndPosts = (
      <section>
        <div className="sidebar-blog-tags">
          <h3>Tags</h3>
          <ul>
            <li><a className="social" onClick={this.getNewest}>Newest</a></li>
            <li><a className="social" onClick={this.getAll}>All</a></li>
            <li><a className="social" onClick={this.getPostsByDate}>2015</a></li>
          </ul>
        </div>
        <div className="sidebar-blog-tags">
          <hr className="sidebar-content-separator"></hr>
          <h4>Posts [{this.state.activeTag}]</h4>
          <ul>
            {
              this.state.sidebarContent.map(function(item, index) {
                return (
                  <li><a className="social" onClick={this.fetchPage.bind(this, item)} key={item} href={"/#/blog/post/" + item._id.slice(0,-3)}>{item.title}</a></li>
                );
              }.bind(this))
            }
          </ul>
        </div>
        <hr className="sidebar-content-separator"></hr>
      </section>
    );

    TagsAndPosts = $(window).width() >= 768? TagsAndPosts : undefined;

    return (
      <div className="about">
        <img src="./public/images/profile.jpg"/>
        <h3 className='sidebar-header'>Justin Peterson</h3>
        <div className="about-links">
          <a className="social" href="https://github.com/jmp3833"><i className="fa fa-github fa-2x"></i></a>
          <a className="social" href="https://www.linkedin.com/in/jmp3833"><i className="fa fa-linkedin fa-2x"></i></a>
          <a className="social" href="https://twitter.com/JPeterson__"><i className="fa fa-twitter fa-2x"></i></a>
        </div>
        <hr className="sidebar-title-divider"></hr>
        <div className="about-text">
          <h3>About</h3>
          <p>{Strings.about}</p>
          <p>{Strings.aboutFooter}</p>
          <p>Check out my <a href="./public/docs/resume.pdf">Resume</a> or shoot me an email at <a>jmp3833@rit.edu</a></p><br></br>
          <hr className="sidebar-content"></hr>
          {TagsAndPosts}
        </div>
      </div>
    );
  },

  getNewest: function(e) {
    this.getFlux().actions.getNewestPosts();
  },

  getAll: function(e) {
    this.getFlux().actions.getAllPosts();
  },

  getPostsByDate: function(e) {
    this.getFlux().actions.getPostsAfterDate('12/31/2014');
  },

  fetchPage: function(item) {
    var postName = item._id.slice(0,-3);
    this.getFlux().actions.setPageMarkup(postName);
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("PortfolioStore").getState();
  },

  componentWillMount: function() {
    this.getFlux().actions.getNewestPosts();
    window.removeEventListener("resize", this.updateDimensions);
  },

  componentDidMount: function() {
    window.addEventListener("resize", this.updateDimensions);
  },

  updateDimensions: function() {
    this.forceUpdate();
  },
});
