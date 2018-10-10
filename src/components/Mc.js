import React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp';


export default class IndexPage extends React.Component {
  state = {
    name: null,
    email: null,
  }

  _handleChange = e => {
    console.log({
      [`${e.target.name}`]: e.target.value,
    })
    this.setState({
      [`${e.target.name}`]: e.target.value,
    })
  }

  _handleSubmit = e => {
    e.preventDefault();
    console.log('submit', this.state)
    addToMailchimp(this.state.email, {name: this.state.name})
    .then(({msg, result}) => {
      console.log('msg', `${result}: ${msg}`);
      if (result !== 'success') {
        throw msg;
      }
      alert(msg);
    })
    .catch(err => {
      console.log('err', err);
      alert(err);
    });
  }

  render() {
    return (
      <section>
          <div className="inner">
              <div>
                <h3 className="align-center">Our developer sandbox is open. Come play.</h3>
                <div>
                  <form onSubmit={this._handleSubmit} className="form__signup--inline">
                    <span className="input-icon"><span className="fa fa-envelope"></span></span>
                    <input type="email" onChange={this._handleChange} placeholder="email" name="email" className="input-with-icon" />
                    <input type="submit" value="Sign Up" />
                  </form>
                </div>
              </div>
          </div>
      </section>

    )
  }
}
