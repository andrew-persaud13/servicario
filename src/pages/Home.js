


import React from 'react'
import { connect  } from 'react-redux'
import ServiceItem from 'components/ServiceItem'
import Hero from 'components/Hero'

import { fetchServices } from '../actions'


class Home extends React.Component {

  state = {
    services: []
  }
  componentDidMount() {
    this.props.fetchServices()
  }

  renderServices(services) {
    return services.map(service =>
      <ServiceItem  
        key={service.id}
        service={service}
      />
    )   
  }

  render() {
    const { services } = this.props
    return (
      <div>
        <Hero />
        <section className="section section-feature-grey is-medium">
          <div className="container">
            <div className="title-wrapper has-text-centered">
              <h2 className="title is-2">Great Power Comes </h2>
              <h3 className="subtitle is-5 is-muted">With great Responsability</h3>
              <div className="divider is-centered"></div>
            </div>

            <div className="content-wrapper">
              <div className="columns is-multiline">
                {
                  this.renderServices(services)
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}



const mapStateToProps = ({ services }) => ({
  services: services.all
})
export default connect(mapStateToProps, { fetchServices })(Home)