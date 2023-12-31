import React, { Component } from 'react';
let Tools = [
    {
        title : 'Single Field',
        name : 'SINGLE_FIELD',
        icon : 'fa fa-wpforms'
    }
];
class ToolBox extends Component {
    render() {
        return (
            <div className="toolbox">
                <div className="card card-default">
                    <div className="text text-light card-header">
                        Drag to add a Field
                    </div>
                    <div className="card-body toolbox-list p-0">
                        <ul className="list-group" ref={(tools) => this._tools = tools}>
                            {
                                Tools.map((types) => {
                                    return <li data-tool={types.name}
                                               onDragStart={(e) => this.dragField(e, types.name)}
                                               key={types.name}
                                               className='list-group-item singleField'>
                                        <i className={types.icon + " mr-3"}></i>
                                        {types.title}
                                        </li>
                                })
                            }
                            {
                                this.renderCustomTools()
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    renderCustomTools(){
        if(this.props.custom) {
            return this.props.custom.map((types) => {
                return <li data-tool={types.toolbox.name}
                           onDragStart={(e) => this.dragField(e, types.toolbox.name)}
                           key={types.toolbox.name}
                           className='list-group-item singleField'>
                    <i className={types.toolbox.icon + " mr-3"}/>
                    {types.toolbox.title}
                </li>
            })
        }
    }

    componentDidMount(){
        let tools = this._tools;
        let $ = window.$;
        $(tools).children().each((i, l) => {
            $(l).draggable({helper: "clone"});
        });
    }

    dragField(e, types){
        e.dataTransfer.setData("dragField", types);
    }
}

export default ToolBox;
