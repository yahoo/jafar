export default {
  descriptionContainsSubject: {
    func: (props) => {
      const description = (props.id === 'description' ? props.value : props.dependencies.description.value) || '';
      const subject = (props.id === 'subject' ? props.value : props.dependencies.subject.value) || '';
      return description.toLowerCase().indexOf(subject.toLowerCase()) > -1;
    },
    message: (props) => {
      const descriptionLabel = (props.id === 'description' ? props.label : props.dependencies.description.label) || '';
      const subjectLabel = (props.id === 'subject' ? props.label : props.dependencies.subject.label) || '';
      return `${subjectLabel} should be included in ${descriptionLabel.toLowerCase()}`;
    },
  },
};
