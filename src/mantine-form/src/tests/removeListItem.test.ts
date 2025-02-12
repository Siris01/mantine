import { act, renderHook } from '@testing-library/react';
import { useForm } from '../use-form';

describe('@mantine/form/removeListItem', () => {
  it('removes list item with given index (root property)', () => {
    const hook = renderHook(() =>
      useForm({ initialValues: { a: [{ b: 1 }, { b: 2 }, { b: 3 }] } })
    );

    act(() => hook.result.current.removeListItem('a', 1));
    expect(hook.result.current.values).toStrictEqual({ a: [{ b: 1 }, { b: 3 }] });
  });

  it('does not change values if given path does not exist', () => {
    const hook = renderHook(() =>
      useForm({ initialValues: { a: [{ b: 1 }, { b: 2 }, { b: 3 }] } })
    );

    act(() => hook.result.current.removeListItem('does.not.exist', 1));
    expect(hook.result.current.values).toStrictEqual({ a: [{ b: 1 }, { b: 2 }, { b: 3 }] });
  });

  it('removes list item with given index (nested list)', () => {
    const hook = renderHook(() =>
      useForm({
        initialValues: {
          a: [
            { b: [{ c: [{ d: 1 }, { d: 2 }, { d: 3 }] }, { c: [{ d: 1 }, { d: 2 }, { d: 3 }] }] },
          ],
        },
      })
    );

    act(() => hook.result.current.removeListItem('a.0.b.1.c', 1));
    expect(hook.result.current.values).toStrictEqual({
      a: [{ b: [{ c: [{ d: 1 }, { d: 2 }, { d: 3 }] }, { c: [{ d: 1 }, { d: 3 }] }] }],
    });
  });
});
