import React from 'react';
import { AlertTriangle, RotateCcw, ArrowLeft } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[AURA OS // ErrorBoundary caught an exception]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div 
          className="flex flex-col items-center justify-center h-full w-full p-6 sm:p-10 text-center font-mono select-none"
          style={{
            backgroundColor: 'var(--color-bg-app, #06070a)',
            color: 'var(--color-text-primary, #ffffff)',
          }}
        >
          <div 
            className="max-w-md w-full p-6 rounded-2xl border flex flex-col items-center gap-4 shadow-2xl"
            style={{
              backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.04))',
              borderColor: 'rgba(239, 68, 68, 0.4)',
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <AlertTriangle size={24} />
            </div>

            <div>
              <span className="text-[10px] tracking-widest uppercase text-red-400 block mb-1">
                SYSTEM FAULT // COMPONENT_CRASH
              </span>
              <h3 className="text-base font-semibold text-white mb-2">
                {this.props.fallbackTitle || 'Component Rendering Interrupted'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3">
                {this.state.error?.message || 'An unexpected rendering error occurred inside this view.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 w-full pt-2 border-t border-white/10">
              {this.props.onBack && (
                <button
                  type="button"
                  onClick={this.props.onBack}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-mono font-medium hover:bg-white/10 text-slate-200 transition-all cursor-pointer"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    borderColor: 'var(--color-border-default)',
                  }}
                >
                  <ArrowLeft size={13} className="text-sky-400" />
                  <span>Return to Explorer</span>
                </button>
              )}

              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer bg-sky-500 text-slate-950 hover:bg-sky-400"
              >
                <RotateCcw size={13} />
                <span>Retry</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

