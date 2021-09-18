import React, { useState, useEffect } from 'react';
import { getSchoolById } from '../../helpers/APICalls/school';
import { Route, useParams } from 'react-router';
import { iSchool } from '../../interface/School';
import CircularProgress from '@material-ui/core/CircularProgress';

interface RouteParams {
  id: string;
}

export default function School(): JSX.Element {

  const [schoolCard, setSchoolCard] = useState<iSchool>(Object);

  const params = useParams<RouteParams>();

  useEffect(() => {
    async function fetchSchoolById() {
      const response = await getSchoolById(params.id);
      if (response) {
        const school = response.school;
        if (school) {
          setSchoolCard(school);
        }
      }
    }
    if(params){
      fetchSchoolById();
    }
  }, [params]);

  return (
    <div>
      {schoolCard ? (   
      <><img src={schoolCard.schoolImage} alt={`picture of ${schoolCard.schoolName}`} /><p>{schoolCard.schoolName}</p><p>{schoolCard.schoolAbout}</p><p>{schoolCard.schoolLocation}</p><p>{schoolCard.schoolAdmission}</p></>
      ) :
      (<CircularProgress />)
    }

    </div>
  );
}