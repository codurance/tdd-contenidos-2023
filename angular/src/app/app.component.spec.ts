import {render} from "@testing-library/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";

function buildComponent() {
  return render(AppComponent, {
    imports: [ReactiveFormsModule]
  });
}

describe('Password validation kata', () => {
  it('should render title', async () => {
    const { findByText } = await buildComponent();

    expect(await findByText('my text')).toBeInTheDocument();
  })
});
