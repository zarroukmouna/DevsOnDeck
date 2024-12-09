import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Skills.css';

const Skills = () => {
  const navigate = useNavigate();

  const goToFrameworks = () => {
    navigate('/frameworks');
  };

  return (
    <div className="skills-container">
      <h1>Add Your Skills</h1>
      <p>Pick your top 5 programming languages:</p>
      <div className="skills-list">
        <label>
          <input type="checkbox" name="skills" value="JavaScript" />
          JavaScript
        </label>
        <label>
          <input type="checkbox" name="skills" value="Python" />
          Python
        </label>
        <label>
          <input type="checkbox" name="skills" value="Java" />
          Java
        </label>
        <label>
          <input type="checkbox" name="skills" value="C++" />
          C++
        </label>
        <label>
          <input type="checkbox" name="skills" value="Ruby" />
          Ruby
        </label>
        <label>
          <input type="checkbox" name="skills" value="PHP" />
          PHP
        </label>
        <label>
          <input type="checkbox" name="skills" value="Go" />
          Go
        </label>
        <label>
          <input type="checkbox" name="skills" value="Swift" />
          Swift
        </label>
        <label>
          <input type="checkbox" name="skills" value="TypeScript" />
          TypeScript
        </label>
        <label>
          <input type="checkbox" name="skills" value="Kotlin" />
          Kotlin
        </label>
      </div>
      <button onClick={goToFrameworks} className="next-button">
        Next: Frameworks
      </button>
    </div>
  );
};

export default Skills;
