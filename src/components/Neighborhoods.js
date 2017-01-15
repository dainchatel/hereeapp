import React, { Component } from 'react';
import Neighb from './Neighb';

class Neighborhoods extends Component {

    addNeighborhood(e) {
      e.preventDefault();
      const neighb = {
        name: this.neighb.value,
      }
      this.props.createNeighb(neighb);
      this.neighb.value = '';
    }


    renderNeighborhoods() {
      const { neighborhoods } = this.props;
      if (neighborhoods) {
        const neighbList = Object.keys(neighborhoods).map(key => { return neighborhoods[key].name})
        const alphaList = neighbList.sort();
        return (alphaList.map(key =>
            <Neighb
              key={key}
              details={key}
              neighborhoods={this.props.neighborhoods}
            />
        ));
      }
    }

    render() {

      return (
        <div>
          <div className='main-neighbs'>
            {this.renderNeighborhoods()}
          </div>

          <form className='neighborhood-add' onSubmit={(e) => {this.addNeighborhood(e)}}>
            <input
              ref={(input) => {
                this.neighb = input;
                }
            }></input>
            <button>+ Neighborhood</button>
          </form>
        </div>
      );
    }
}



export default Neighborhoods;
