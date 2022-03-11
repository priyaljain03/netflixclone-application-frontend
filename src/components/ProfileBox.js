import React, { useEffect,useState } from 'react';
import "../css/ProfileBox.css"
import { Link ,useNavigate} from "react-router-dom"
import { AiOutlineEdit } from "react-icons/ai";
import { FiPlusCircle,FiEdit2 } from "react-icons/fi";
import { handleAbort } from 'video-react/lib/actions/video';

const baseUrl = 'http://localhost:8000'

function ProfileBox(props) {
  const navigate = useNavigate()
  const [type,setType] = useState("")
  const {addProfile} = props

  useEffect(()=>{
    setType(props.type)
  },[])

  const handleClick = (e)=>{
    if(type=="profile"){
      if(props.editable==true){
        navigate('/editprofile',{state:{'profileId':props.id}})
      }else{
        navigate('/browse',{state:{'profileId':props.id}})
      }
    }else if(type=="addProfile"){
      navigate('/createprofile')
    }

  }

  return( 
    <div className="profile__wrapper">
      <div onClick={handleClick} className={`profile__imgbox ${props.editable?"profile__imgfade":""}`} style={{backgroundImage:props.addProfile?'transparent':`url("${props.image}")`}}>
        {props.editable?<FiEdit2 className="editProfile" />:""}
        {props.type=='addProfile'?<FiPlusCircle className="addProfile"/>:""}
      </div>
      <div className="profile__name">
        {props.title?props.title:""}
      </div>
    </div>
   )
}

export default ProfileBox;