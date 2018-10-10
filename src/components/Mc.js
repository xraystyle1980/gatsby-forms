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
              <header className="major">
                  <h2>Massa libero</h2>
              </header>
              <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus pharetra. Pellentesque condimentum sem. In efficitur ligula tate urna. Maecenas laoreet massa vel lacinia pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus amet pharetra et feugiat tempus.</p>
              <div>
                <h1>Hi people</h1>
                <p>Submit the form below and check your browser console!</p>
                <div>
                  <form onSubmit={this._handleSubmit}>
                    <input type="email" onChange={this._handleChange} placeholder="email" name="email" />
                    <input type="submit" />
                  </form>
                </div>
              </div>
          </div>
      </section>

    )
  }
}
