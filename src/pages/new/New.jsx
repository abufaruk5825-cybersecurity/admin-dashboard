/**
 * Legacy New page. Now rendered inside DashboardLayout's Outlet.
 * Proper form pages: UserForm (/users/new) and ProductForm (/products/new).
 */
import './New.scss';
import { FolderUp } from 'lucide-react';
import { useState } from 'react';

const New = ({ inputs, title }) => {
  const [file, setFile] = useState(null);

  return (
    <div className="new-content">
      <div className="new-top"><h1>{title || 'Add New'}</h1></div>
      <div className="new-bottom">
        <div className="new-left">
          <img src={file ? URL.createObjectURL(file) : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'} alt="preview"/>
        </div>
        <div className="new-right">
          <form onSubmit={e=>e.preventDefault()}>
            <div className="formInput">
              <label htmlFor="file">Image: <FolderUp className="icon"/></label>
              <input type="file" id="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} style={{display:'none'}}/>
            </div>
            {inputs?.map(input=>(
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input type={input.type} placeholder={input.placeholder}/>
              </div>
            ))}
            <button type="submit" className="submit-btn">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default New;
