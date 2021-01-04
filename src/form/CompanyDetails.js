import React, { Component } from "react";
import "./detail.css";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Industry, Years } from "./data";
import axios from "axios";


const StyledButton = withStyles({
  root: {
    background: "#F93800",
    borderRadius: 6,
    border: 0,
    color: "white",
    height: 38,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);
const StyledTextField = withStyles({
  root: {
    background: "#FFFF",
  }
})(TextField);
const animatedComponents = makeAnimated();

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      filename: null,
      businessDescription: null,
      problemSolved: null,
      businessTargetAudience: null,
      aboutBusiness: null,
      businessMission: null,
      businessVision: null,
      details: this.props.details,
      Industry: null,
      year: null,
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };
  handleSelectyear = (e) => {
    this.setState({ year: e.value });
  };
  onClick = (e) => {
    const data = {
      businessName: this.state.details.businessName,
      businessIndustry: this.state.businessIndustry,
      yearFound: `${this.state.year}`,
      businessDescription: this.state.businessDescription,
      problemSolved: this.state.problemSolved,
      aboutBusiness: this.state.aboutBusiness,
      businessTargetAudience: this.state.businessTargetAudience,
      businessEmail: this.state.details.businessEmail,
      password: this.state.details.password,
      businessMission: this.state.businessMission,
      businessVision: this.state.businessVision,
    };

    const fd = new FormData();
    fd.append("data", JSON.stringify(data));
    fd.append("file", this.state.image);

       this.props.history.push({ pathname: "/loading", data: fd });
  };
  handleSelectIndustry = (e) => {
    console.log(e);

    this.setState({ businessIndustry: e.label });
  };
  onChange = (e) => {
    this.setState({
      image: e.target.files[0],
      filename: e.target.files[0].name,
    });
  };
  render() {
    return (
      <div class="detailscard">
        <div class="details">
          <div class="padding">
             <div className='atterisk'>
              <p style={{color:'red','font-size':'18px',height:18}}>*</p>
            <p>Year Founded: </p>
            </div>
            <Select
              label="year"
              closeMenuOnSelect={true}
              onChange={this.handleSelectyear}
              components={animatedComponents}
              options={Years}
            />
          </div>
          <div class="padding">
           <div className='atterisk'>
              <p style={{color:'red','font-size':'18px',height:18}}>*</p>
            <p>Company Description(15 words max): </p>
           </div>
            <StyledTextField
              id="Companyname"
              name="businessDescription"
              onChange={this.handleChange}
           
              fullWidth
              rows={4}
              multiline
              variant="outlined"
            />
          </div>
          <div class="padding">
        <div className='atterisk'>
              <p style={{color:'red','font-size':'18px',height:18}}>*</p>
            <p>Industry: </p>
           </div>
            <Select
              name="Industry"
              closeMenuOnSelect={true}
              components={animatedComponents}
              onChange={this.handleSelectIndustry}
              options={Industry}
            />
          </div>
          <div class="padding">
           <div className='atterisk'>
              <p style={{color:'red','font-size':'18px',height:18}}>*</p>
            <p>Tackling Which Problem: </p>
            </div>
            <StyledTextField
              id="Companyname"
              name="problemSolved"
              rows={2}
              multiline
              onChange={this.handleChange}
              fullWidth
              variant="outlined"
            />
          </div>
          <div class="padding">
            <div className='atterisk'>
              <p style={{color:'red','font-size':'18px',height:18}}>*</p>
            <p>Target Audience: </p>
            </div>
            <StyledTextField
              id="Companyname"
              name="businessTargetAudience"
              multiline
              rows={2}
              onChange={this.handleChange}
              fullWidth
              variant="outlined"
            />
          </div>

          
        </div>
        <div class="addEnt">
          <div class="addEnt">
            <div class="paddingRole">
              <div className='atterisk'>
              <p style={{color:'red','font-size':'18px',height:18}}>*</p>
              <p> Mission (What challenge have you set out for your company to do): </p>
              </div>
              <StyledTextField
                onChange={this.handleChange}
                name="businessMission"
                color='primary'
                multiline
                rows={3}
                fullWidth
                variant="outlined"
              />
            </div>
            <div class="paddingRole">
            <div className='atterisk'>
              <p style={{color:'red','font-size':'18px',height:18}}>*</p>
              <p> Vision (What kind of world is your business trying to create) :  </p>
              </div>
              <StyledTextField
                onChange={this.handleChange}
                name="businessVision"
                multiline
                rows={3}
                fullWidth
                variant="outlined"
              />
            </div>
            <div class="paddingRole">
              <div className='atterisk'>
              <p style={{color:'red','font-size':'18px',height:18}}>*</p>
              <p> About (More information about your business): </p>
              </div>
              <StyledTextField
                onChange={this.handleChange}
                name="aboutBusiness"
                multiline
                rows={7}
                fullWidth
                variant="outlined"
              />
            </div>
           <div class="padding">
            <p>Profile Picture: </p>
            <div className="custom-file mb-4">
              <input
                type="file"
                accept="image/*"
               style={{width:'75%'}}                
                id="customFile"
                onChange={this.onChange}
              />
               <StyledButton onClick={this.onClick} >
                Submit
              </StyledButton>
            </div>
          </div>
            <div class="padding">
            <p style={{height:1000}}></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



class CompanyDetails extends Component {
  render() {
    return (
      <div class="detcover">
        <div class="detailscard">
          <Details
            history={this.props.history}
            details={this.props.location.details}
          />
        </div>
      </div>
    );
  }
}
export default CompanyDetails;
