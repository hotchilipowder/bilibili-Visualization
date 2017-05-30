import React,{Component} from "react";
import { Button, Header, Icon, Image, Modal } from "semantic-ui-react"
import paragraph from '../assets/img/paragraph.png'

export default class MyDialogModal extends Component{
	state = { open: false }

	showModal(){
		this.setState({
			open: true
		})
	}

	closeModal(){
		this.setState({
			open: false
		})
	}

	render(){
		return (
			<div>
				<Button onClick={() => this.showModal()}>modal</Button>
				<Modal dimmer="blurring" open={this.state.open} onClose={()=> this.closeModal()}>
			    <Modal.Header>Profile Picture</Modal.Header>
			    <Modal.Content image>
			      <Image wrapped size="medium" src="/assets/images/wireframe/image.png" />
			      <Modal.Description>
			        <Header>Modal Header</Header>
			        <p>This is an example of expanded content that will cause the modal"s dimmer to scroll</p>
			        <Image src={paragraph} />
			        <Image src={paragraph} />
			        <Image src={paragraph} />
			        <Image src={paragraph} />
			        <Image src={paragraph} />
			        <Image src={paragraph} />
			        <Image src={paragraph} />
			      </Modal.Description>
			    </Modal.Content>
			    <Modal.Actions>
			      <Button primary onClick={()=> this.closeModal()}>
			        Proceed <Icon name="right chevron" />
			      </Button>
			    </Modal.Actions>
			  </Modal>
			</div>
		)
	}
}