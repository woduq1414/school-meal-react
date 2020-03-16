import React from "react";

import styled from 'styled-components';

import {withRouter} from "react-router-dom";
import Menu from "./Menu";

const MenuName = styled.li`
    text-align:center;
  list-style-type : none;
  border : 0.8px solid #eee;
  padding: 5px 20px;
`

function formatDate(date) {
    return `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`
}

const MenuCertainStat = props => {
    const data = props.data
    if (data && Object.keys(data).length> 0) {
        return (
            <div>
                {
                    Object.keys(data).map((menu, index) => (
                        <div>
                            <span>
                                {menu}({data[menu].distance}) :
                            </span>
                            {
                                data[menu].dates.map((date, index) => (
                                    <span>
                                        <div style={{"display": "inline-block"}}
                                             onClick={() => props.moveDate(formatDate(date))}>
                                            {date}
                                        </div>
                                        &nbsp;
                                    </span>
                                ))

                            }


                        </div>

                    ))
                }
            </div>
        )
    } else {
        return (
            <div>메뉴를 눌러보세요~~</div>
        )
    }

}
export default withRouter(MenuCertainStat);
