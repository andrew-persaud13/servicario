import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import withAuth from 'components/hoc/withAuth';
import { createService } from '../../actions'


const ServiceCreate = ({ auth }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [serviceForm, setServiceForm] = useState({
    category: '',
    title: '',
    description: '',
    image: '',
    price: null
  })

  const handleChange = (e) => setServiceForm({ ...serviceForm, [e.target.name] : e.target.value  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createService(serviceForm, auth.user.uid)
      .then(_ => setShouldRedirect(true))
      .catch(() => alert('SOME ERROR'))
  }

 if (shouldRedirect) return <Redirect to="/" />
  return (
    <div className="create-page">
      <div className="container">
        <div className="form-container">
          <h1 className="title">Create Service</h1>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select">
                  <select name="category" onChange={handleChange}>
                    <option value="mathematics">Mathematics</option>
                    <option value="programming">Programming</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className="input"
                  name="title"
                  onChange={handleChange}
                  type="text"
                  placeholder="Text input" />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="description"
                  onChange={handleChange}
                  placeholder="Textarea"></textarea>
              </div>
            </div>
            <div className="field">
              <label className="label">Image Url</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  onChange={handleChange}
                  name="image"
                  placeholder="Text input" />
              </div>
            </div>
            <div className="field">
              <label className="label">Price per Hour</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  onChange={handleChange}
                  name="price"
                  placeholder="Text input" />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button
                  type="submit" className="button is-link">Create</button>
              </div>
              <div className="control">
                <button  className="button is-text">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
  </div>
  );
};

export default  withAuth(ServiceCreate);