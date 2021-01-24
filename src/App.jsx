import React from 'react';
import './App.css';
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      raw_data: [],
      currencies: [],
      show_non_supported_currency_in_us: false,
      show_support_test_mode: false,
      sort_list_by_aphabetic_order: false,
    }

  }

  componentWillMount = () => {
    this.getCurrency();
  }

  getCurrency = async () => {

    try {
      const response = await fetch(`https://api.moonpay.io/v3/currencies`);
      const data = await response.json();
      console.table(data)
      this.setState({raw_data: data});
    } catch(err) {
      console.log(err);
    }

  }


  toggle_data = (event) => {
    console.log(event.target.name)
    // this.setState({show_support_test_mode: !this.state.show_support_test_mode});
    this.setState({
      [event.target.name]: !(this.state[event.target.name])
    })
    setTimeout(() => {
      this.filter();
    }, 2000);
  }


  filter = () => {
    console.log(this.state.show_support_test_mode);
    let filtered_currency_data = [];

    if (this.state.show_support_test_mode && !this.state.show_non_supported_currency_in_us) {

      if (this.state.currencies.length > 0 ) {
        filtered_currency_data = this.state.currencies.filter( currency => currency.supportsTestMode === true);
        if (this.state.sort_list_by_aphabetic_order) {
          this.sort_list_apha_order()
        }

      } else {
        filtered_currency_data = this.state.raw_data.filter( currency => currency.supportsTestMode === true);
        if (this.state.sort_list_by_aphabetic_order) {
          this.sort_list_apha_order()
        }

      }
      
      this.setState({currencies: filtered_currency_data});
      // console.table(filtered_currency_data);

    } else if (!this.state.show_support_test_mode && this.state.show_non_supported_currency_in_us) {

      if (this.state.currencies.length > 0)  {
        filtered_currency_data = this.state.currencies.filter( currency => currency.isSupportedInUS === false);
        if (this.state.sort_list_by_aphabetic_order) {
          this.sort_list_apha_order()
        }
      } else {
        filtered_currency_data = this.state.raw_data.filter( currency => currency.supportsTestMode === true);
        if (this.state.sort_list_by_aphabetic_order) {
          this.sort_list_apha_order()
        }

      }

      this.setState({currencies: filtered_currency_data, show_non_supported_currency_in_us: this.state.show_non_supported_currency_in_us});

    } else {
      this.setState({currencies: this.state.raw_data});
      filtered_currency_data = this.state.raw_data;
    }

    console.table(filtered_currency_data)

  }

  sort_list_apha_order = () => {

    const hold = this.state.currencies.sort(function(a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    });

    console.table(hold)


  }

  render() {
    return (
          <div className="wrapper">

            <button name="show_non_supported_currency_in_us" className={'not_active '} onClick={this.toggle_data} > {this.state.show_non_supported_currency_in_us ? 'Show currency not supported in us ' : 'Show currency supported only in us'}</button>
            <button name="show_support_test_mode" className={'not_active '} onClick={this.filter} > {this.state.show_support_test_mode ? 'Show currency not available test mode ' : 'Show currency available test mode'}</button>
            <button name="sort_list_by_aphabetic_order" className={'not_active'} onClick={this.filter}>Sort by aphbetic order</button>
            <button className={'not_active'} >Sort by aphbetic order symbol</button>

          </div>
        );
  }

}

export default App;
