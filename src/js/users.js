(function($){
    'use strict';

    var UserList = React.createClass({
	load: function() {
	    $.get(this.props.source, function(result) {
		this.setState({data: result});
	    }.bind(this));
	},

	getInitialState: function() {
	    return {data: []};
	},
	componentDidMount: function() {
	    this.load();
	},

	render: function() {
	    var userNodes = this.state.data.map(function (user) {
		return (
		    <li>
		    <EditUserForm user={user} source={this.props.source} reloadUser={this.load} />
		    </li>
		);
	    }.bind(this));
	    return (
		<div>
   		<ul data={this.state.data}>{userNodes}</ul>
		<NewUserForm source={this.props.source} reloadUser={this.load} />
		</div>
	    );
	}
    });

    var EditUserForm = React.createClass({
	getInitialState: function() {
	    return {showForm: false};
	},
	toggleEditForm: function() {
	    this.setState({showForm: !this.state.showForm});
	},
	handleSubmit: function(e){
	    e.preventDefault();
	    var name = React.findDOMNode(this.refs.name).value.trim();
	    var email = React.findDOMNode(this.refs.email).value.trim();
	    if (!name || !email) {
		return;
	    }

	    $.ajax({
		type: 'PUT',
		url: this.props.source + this.props.user.id,
		data: {
		    name: name,
		    email: email
		}
	    })
	    .done(function(res){
		this.toggleEditForm();
		this.props.reloadUser();
	    }.bind(this))
	    .fail(function(res){
		var errors = $.parseJSON(res.responseText).data;
		console.log(errors);
	    });

	    React.findDOMNode(this.refs.name).value = '';
	    React.findDOMNode(this.refs.email).value = '';
	    return;
	},
	render: function() {
	    return (
		<span>
		{ this.state.showForm ? 
		<form onSubmit={this.handleSubmit}>
		<input type="text"  placeholder="name..." ref="name" defaultValue={this.props.user.name}/>
		<input type="text" placeholder="email..." ref="email" defaultValue={this.props.user.email} />
		<input type="submit" value="update" />
		<a href="#" onClick={this.toggleEditForm}>キャンセル</a>
		</form>
		: 
		<span>
		{this.props.user.name} - {this.props.user.email}
		<a href="#" onClick={this.toggleEditForm}>編集</a>
		</span>
	    }
		  </span>
	    );
	}
    });

    var NewUserForm = React.createClass({
	handleSubmit: function(e){
	    e.preventDefault();
	    var name = React.findDOMNode(this.refs.name).value.trim();
	    var email = React.findDOMNode(this.refs.email).value.trim();
	    if (!name || !email) {
		return;
	    }

	    $.ajax({
		type: 'POST',
		url: this.props.source,
		data: {
		    name: name,
		    email: email
		}
	    })
	    .done(function(res){
		this.props.reloadUser();
	    }.bind(this))
	    .fail(function(res){
		var errors = $.parseJSON(res.responseText).data;
		console.log(errors);
	    });


	    React.findDOMNode(this.refs.name).value = '';
	    React.findDOMNode(this.refs.email).value = '';
	    return;
	},
	render: function() {
	    return (
		<form onSubmit={this.handleSubmit}>
		<input type="text"  placeholder="name..." ref="name" />
		<input type="text" placeholder="email..." ref="email" />
		<input type="submit" value="add" />
		</form>
	    );
	}
    });
    
    var source = document.getElementById('users').getAttribute('data-source');

    React.render(
	<div>
	<UserList source={source} />
	</div>,
	document.getElementById('users')
    );
})(jQuery);

