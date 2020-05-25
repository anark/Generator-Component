import React from 'react'
import <%=componentName %>, { Props } from './<%=componentName%>'

export default {
  title: '<%=componentName%>',
  component: <%=componentName %>,
  argTypes: {
  }
}

export const Default = (args: Props) => <<%=componentName%> {...args} />
Default.story = { args: { } }
