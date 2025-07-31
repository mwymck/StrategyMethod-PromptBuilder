

import argparse
import swatch
import os

def to_css_vars(swatches):
    """Converts a list of swatches to CSS custom properties."""
    css_vars = []
    for s in swatches:
        if 'swatches' in s:
            css_vars.extend(to_css_vars(s['swatches']))
        else:
            name = s['name'].lower().replace(' ', '-')
            if s['data']['mode'] == 'RGB':
                r, g, b = [int(c * 255) for c in s['data']['values']]
                css_vars.append(f"  --{name}: rgb({r}, {g}, {b});")
            elif s['data']['mode'] == 'CMYK':
                # A simple, not color-managed conversion
                c, m, y, k = s['data']['values']
                r = int(255 * (1 - c) * (1 - k))
                g = int(255 * (1 - m) * (1 - k))
                b = int(255 * (1 - y) * (1 - k))
                css_vars.append(f"  --{name}: rgb({r}, {g}, {b});")
            elif s['data']['mode'] == 'Gray':
                gray = int(s['data']['values'][0] * 255)
                css_vars.append(f"  --{name}: rgb({gray}, {gray}, {gray});")
    return css_vars

def main():
    parser = argparse.ArgumentParser(description='Convert .ase file to CSS variables.')
    parser.add_argument('input_file', help='The input .ase file path.')
    parser.add_argument('output_file', help='The output .css file path.')
    args = parser.parse_args()

    if not os.path.exists(args.input_file):
        print(f"Error: Input file not found at {args.input_file}")
        return

    try:
        swatches = swatch.parse(args.input_file)
        css_variables = to_css_vars(swatches)

        with open(args.output_file, 'w') as f:
            f.write(':root {\n')
            for var in css_variables:
                f.write(f"{var}\n")
            f.write('}\n')

        print(f"Successfully converted {args.input_file} to {args.output_file}")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    main()

