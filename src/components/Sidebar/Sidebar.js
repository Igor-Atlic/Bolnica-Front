import React from "react";
import SidebarLink from "../SidebarLink/SidebarLink";
import "./styles.css";

const Sidebar = ({ links }) => {
	return (
		<div>
			<div className="sidebar-container container-flex navbar-expand-sm navbar-light">
				<button
					className="navbar-toggler bg-white"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse smaller-container bg-white .d-none .d-sm-block .d-md-none"
					id="navbarSupportedContent"
				>
					<div className="customBrand1">IBIS - Bolnica</div>

					<div className="customBrand2">IBIS sistem</div>
					<ul className="link-list">
						{links.map((link) => {
							return <SidebarLink link={link} key={link.id} />;
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
