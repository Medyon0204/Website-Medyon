export interface NavSubItem {
  label: string;
  href: string;
}

export interface NavDropdownItem extends NavSubItem {
  children?: NavSubItem[];
}

export interface NavItem {
  label: string;
  href?: string;
  dropdown?: NavDropdownItem[];
}
