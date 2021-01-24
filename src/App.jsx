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
      if (data.length > 0) {
        this.show_non_supported_currency_in_us();
      }
    } catch(err) {
      console.log(err);
    }

  }

  show_non_supported_currency_in_us = () => {
    let set_filtered_data = [];
    let filtered_raw_data = [];
    let filtered_currency_data = [];

    if (this.state.show_non_supported_currency_in_us) {

      filtered_raw_data = this.state.raw_data.filter( currency => currency.isSupportedInUS === false);

      if (this.state.currencies.length > 0)  {
        filtered_currency_data = this.state.currencies.filter( currency => currency.isSupportedInUS === false);
      }
 
      set_filtered_data = [...filtered_raw_data, ...filtered_currency_data];


      this.setState({currencies: set_filtered_data, show_non_supported_currency_in_us: false});
      console.table(set_filtered_data);

    } else {

      filtered_raw_data = this.state.raw_data.filter( currency => currency.isSupportedInUS === true);

      if (this.state.currencies.length > 0)  {
        filtered_currency_data = this.state.currencies.filter( currency => currency.isSupportedInUS === true);
      }
 
      set_filtered_data = [...filtered_raw_data, ...filtered_currency_data];


      this.setState({currencies: set_filtered_data, show_non_supported_currency_in_us: true});
      console.table(set_filtered_data);
    }

  }

  filter_currency_test_mode = () => {

    let set_filtered_data = [];
    let filtered_raw_data = [];
    let filtered_currency_data = [];

    if (this.state.show_support_test_mode) {

      filtered_raw_data = this.state.raw_data.filter( currency => currency.supportsTestMode === false);

      if (this.state.currencies.length > 0)  {
        filtered_currency_data = this.state.currencies.filter( currency => currency.supportsTestMode === false);
      }
 
      set_filtered_data = [...filtered_raw_data, ...filtered_currency_data];


      this.setState({currencies: set_filtered_data, show_support_test_mode: false});
      console.table(set_filtered_data);

    } else {

      filtered_raw_data = this.state.raw_data.filter( currency => currency.supportsTestMode === true);

      if (this.state.currencies.length > 0)  {
        filtered_currency_data = this.state.currencies.filter( currency => currency.supportsTestMode === true);
      }
 
      set_filtered_data = [...filtered_raw_data, ...filtered_currency_data];


      this.setState({currencies: set_filtered_data, show_support_test_mode: true});
      console.table(set_filtered_data);
    }


  }

  sort_list_apha_order = () => {

    


  }

  render() {
    return (
          <div className="wrapper">

            <button className={'not_active '} onClick={this.show_non_supported_currency_in_us} > {this.state.show_non_supported_currency_in_us ? 'Show currency not supported in us ' : 'Show currency supported only in us'}</button>
            <button className={'not_active '} onClick={this.filter_currency_test_mode} > {this.state.show_support_test_mode ? 'Show currency not available test mode ' : 'Show currency available test mode'}</button>
            <button className={'not_active'} onClick={this.sort_list_apha_order}>Sort by aphbetic order</button>
            <button className={'not_active'} >Sort by aphbetic order symbol</button>

          </div>
        );
  }

}

export default App;
